import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentEntity } from './entities/incident.entity';
import { Brackets, Repository } from 'typeorm';
import { UserRequestEntity } from './entities/user_request.entity';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { DeliveryRequestEntity } from './entities/delivery_request.entity';
import { ContactService } from '../contact/contact.service';
import { CreatePublicLogDto } from './dto/create-publicLog.dto';
import { response } from 'express';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(IncidentEntity)
    private incidentRepo: Repository<IncidentEntity>,
    @InjectRepository(UserRequestEntity)
    private userRequestRepo: Repository<UserRequestEntity>,
    @InjectRepository(DeliveryRequestEntity)
    private deliveryRequestRepo: Repository<DeliveryRequestEntity>,
    private readonly httpService: HttpService,
    private readonly personService: ContactService,
  ) {}
  async create(dto: CreateTicketDto, contact_id) {
    console.log(contact_id);
    const person = await this.personService.findContact(contact_id, 'Person');
    const json_data = {
      operation: 'core/create',
      comment: person.friendlyname,
      class: dto.class,
      output_fields: dto.output_fields
        ? dto.output_fields
        : 'id, friendlyname, caller_id_friendlyname, finalclass',
      fields: {
        caller_id: contact_id,
        org_id: 'SELECT Organization WHERE name = "Anorbank"',
        title: encodeURI(dto.title),
        title_example: encodeURI(dto.title),
        description: dto.description,
      },
    };
    if (dto.class === 'DeliveryRequest') {
      delete json_data.fields.title;
    } else {
      delete json_data.fields.title_example;
    }
    console.log(json_data);

    const req = this.httpService.post(
      process.env.ITOP_URL +
        '/webservices/rest.php?version=1.3&json_data=' +
        JSON.stringify(json_data),
      {},
      {
        auth: {
          username: process.env.ITOP_USERNAME,
          password: process.env.ITOP_PASSWORD,
        },
      },
    );
    return req.pipe(map((response) => response.data));
  }

  findTickets(finalclass: string, filter) {
    switch (finalclass) {
      case 'Incident':
        const incident = this.incidentRepo.createQueryBuilder();
        return this.search(incident, filter);
      case 'UserRequest':
        const userRequest = this.userRequestRepo.createQueryBuilder();
        return this.search(userRequest, filter);
      case 'DeliveryRequest':
        const deliveryRequest = this.deliveryRequestRepo.createQueryBuilder();
        return this.search(deliveryRequest, filter);
    }
  }

  async search(qb, filter) {
    const take = filter.limit ? Number(filter.limit) : 10;
    const page = filter.page ? Number(filter.page) : undefined;
    const search = filter.search ? filter.search : undefined;
    qb.take(take);
    qb.skip(page ? page * take - take : 0);
    qb.orderBy({
      id: 'DESC',
    });
    const items: IncidentEntity[] = await qb
      .where(search ? `title LIKE '%${search}%'` : '1 = 1')
      .orWhere(search ? `ref LIKE '%${search}%'` : '1 = 1')
      .orWhere(search ? `description LIKE '%${search}%'` : '1 = 1')
      .orWhere(search ? `id LIKE '%${search}%'` : '1 = 1')
      .getMany();
    const total = await qb.getCount();

    // response attributes
    const list = [
      'ref',
      'id',
      'title',
      'caller_id',
      'caller_id_friendlyname',
      'finalclass',
      'status',
      'start_date',
    ];
    items.map((ticket) =>
      Object.keys(ticket).forEach(
        (key) => list.includes(key) || delete ticket[key],
      ),
    );
    return {
      items,
      total,
    };
  }

  findOne(id: number, type: string) {
    if (!id) {
      throw new NotFoundException();
    }
    switch (type) {
      case 'Incident':
        return this.incidentRepo.findOneBy({ id: id });
      case 'UserRequest':
        return this.userRequestRepo.findOneBy({ id: id });
      case 'DeliveryRequest':
        return this.deliveryRequestRepo.findOneBy({ id: id });
    }
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }

  async publicLog(id: number, finalclass: string) {
    const json_data = {
      operation: 'core/get',
      class: finalclass,
      key: id,
      output_fields: 'public_log',
    };
    const req = await this.httpService.get(
      process.env.ITOP_URL +
        '/webservices/rest.php?version=1.3&json_data=' +
        JSON.stringify(json_data),
      {
        auth: {
          username: process.env.ITOP_USERNAME,
          password: process.env.ITOP_PASSWORD,
        },
      },
    );

    const res = await lastValueFrom(req.pipe(map((response) => response.data)));
    if (!res) {
      throw new NotFoundException();
    }
    const objects = Object.values(res.objects)[0];
    // @ts-ignore
    const public_logs = objects.fields.public_log.entries;
    return public_logs;
  }

  async addPublicLog(dto: CreatePublicLogDto, user_id: number) {
    const json_data = {
      operation: 'core/update',
      comment: 'Comment',
      class: dto.finalclass,
      key: dto.key,
      output_fields: 'public_log',
      fields: {
        public_log: {
          add_item: {
            user_id: user_id,
            message: dto.message,
            format: 'text',
          },
        },
      },
    };
    console.log(json_data);

    const req = this.httpService.post(
      process.env.ITOP_URL +
        '/webservices/rest.php?version=1.3&json_data=' +
        JSON.stringify(json_data),
      {},
      {
        auth: {
          username: process.env.ITOP_USERNAME,
          password: process.env.ITOP_PASSWORD,
        },
      },
    );
    const res = await lastValueFrom(req.pipe(map((response) => response.data)));
    return res.objects;
  }
}
