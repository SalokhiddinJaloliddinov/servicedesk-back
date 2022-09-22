import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private repository: Repository<PersonEntity>,
  ) {}

  // create(createPersonDto: CreatePersonDto) {
  //   return 'This action adds a new person';
  // }

  async findAll() {
    const qb = this.repository.createQueryBuilder();
    qb.limit(20);
    qb.orderBy({
      id: 'ASC',
    });
    const [items, total] = await qb.getManyAndCount();
    return {
      items,
      total,
    };
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  // update(id: number, updatePersonDto: UpdatePersonDto) {
  //   return `This action updates a #${id} person`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} person`;
  // }
}
