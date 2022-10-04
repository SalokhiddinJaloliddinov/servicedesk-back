import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user_request.dto';
import { UpdateUserRequestDto } from './dto/update-user_request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequestEntity } from './entities/user_request.entity';
import { Brackets, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { PersonService } from '../person/person.service';
import { SearchUserRequestDto } from './dto/search-user_request.dto';
import { limits } from 'argon2';

require('dotenv').config();

@Injectable()
export class UserRequestService {
  constructor(
    @InjectRepository(UserRequestEntity)
    private repository: Repository<UserRequestEntity>,
    private readonly httpService: HttpService,
    private readonly personService: PersonService,
  ) {}

  async create(dto: CreateUserRequestDto, caller_id) {
    console.log(caller_id);
    const person = await this.personService.findOne(caller_id);
    const json_data = {
      operation: 'core/create',
      comment: person.friendlyname,
      class: 'UserRequest',
      output_fields: 'id, friendlyname',
      fields: {
        caller_id: caller_id,
        org_id: 'SELECT Organization WHERE name = "Anorbank"',
        title: dto.title,
        description: dto.description,
      },
    };

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

  async findAllAsCaller(contact_id, pagination: SearchUserRequestDto) {
    const qb = this.repository.createQueryBuilder();
    const take = pagination.limit ? Number(pagination.limit) : null;
    const page = pagination.page ? Number(pagination.page) : null;
    qb.take(take ? take : 10);
    qb.skip(page ? page * take - take : 0);
    qb.orderBy({
      id: 'DESC',
    });
    const [items, total] = await qb
      .where({ caller_id: contact_id })
      .getManyAndCount();
    return { items, total };
  }

  async findAllAs(contact_id, pagination: SearchUserRequestDto) {
    const qb = this.repository.createQueryBuilder();
    const take = pagination.limit ? Number(pagination.limit) : 10;
    const page = pagination.page ? Number(pagination.page) : undefined;
    const search = pagination.search ? pagination.search : undefined;
    console.log(take, page);
    qb.take(take);
    qb.skip(page ? page * take - take : 0);
    qb.orderBy({
      id: 'DESC',
    });
    const [items, total] = await qb
      .where(
        pagination.isCaller
          ? { caller_id: contact_id }
          : pagination.isAgent
          ? { agent_id: contact_id }
          : '',
      )
      .andWhere(
        new Brackets((qb1) => {
          qb1
            .where(search ? `title LIKE '%${search}%'` : '1 = 1')
            .orWhere(search ? `ref LIKE '%${search}%'` : '1 = 1')
            .orWhere(search ? `description LIKE '%${search}%'` : '1 = 1')
            .orWhere(search ? `id LIKE '%${search}%'` : '1 = 1');
        }),
      )
      .getManyAndCount();
    console.log(qb.getSql());
    return { items, total };
  }

  async findOne(id: number) {
    const find = await this.repository.findOne({ where: { id: id } });

    if (!find) {
      throw new NotFoundException();
    }

    return find;
  }

  update(id: number, updateUserRequestDto: UpdateUserRequestDto) {
    return `This action updates a #${id} userRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRequest`;
  }
}
