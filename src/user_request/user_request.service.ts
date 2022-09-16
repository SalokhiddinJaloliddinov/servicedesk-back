import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user_request.dto';
import { UpdateUserRequestDto } from './dto/update-user_request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequestEntity } from './entities/user_request.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { SearchUserRequestDto } from './dto/search-user_request.dto';

require('dotenv').config();

@Injectable()
export class UserRequestService {
  constructor(
    @InjectRepository(UserRequestEntity)
    private repository: Repository<UserRequestEntity>,
    private readonly httpService: HttpService,
  ) {}

  create(dto: CreateUserRequestDto) {
    const json_data = {
      operation: 'core/create',
      comment: 'Synchronization from blah',
      class: 'UserRequest',
      output_fields: 'id, friendlyname',
      fields: {
        caller_id: dto.caller_id,
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

  async findAll() {
    const qb = this.repository.createQueryBuilder();

    qb.limit(20);
    qb.orderBy({
      id: 'DESC',
    });
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  async search(filter) {
    const qb = this.repository.createQueryBuilder();
    qb.orWhere(`id LIKE '%${filter}%'`);
    qb.orWhere(`title LIKE '%${filter}%'`);
    qb.orWhere(`description LIKE '%${filter}%'`);
    qb.orWhere(`ref LIKE '%${filter}%'`);
    qb.orderBy({
      id: 'DESC',
    });

    const [items, total] = await qb.getManyAndCount();
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
