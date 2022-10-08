import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './entities/contact.entity';
import { SearchContactDto } from './dto/search-contact.dto';
import { PersonEntity } from './entities/person.entity';
import { Buffer } from 'buffer';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepo: Repository<ContactEntity>,
    @InjectRepository(PersonEntity)
    private personRepo: Repository<PersonEntity>,
  ) {}
  create(createContactDto: CreateContactDto) {
    return 'This action adds a new contact';
  }

  async allTeam(filter: SearchContactDto) {
    console.log(filter);
    const qb = this.contactRepo.createQueryBuilder();
    const take = filter.limit ? Number(filter.limit) : 10;
    const page = filter.page ? Number(filter.page) : undefined;
    const search = filter.search ? filter.search : undefined;
    qb.take(take);
    qb.skip(page ? page * take - take : 0);
    qb.orderBy({
      id: 'DESC',
    });
    const [items, total] = await qb
      .where('finalclass = "Team"')
      .andWhere(search ? `friendlyname LIKE "%${search}%"` : '1 = 1')
      .getManyAndCount();
    console.log(qb.getSql());
    return {
      items,
      total,
    };
  }

  findContact(id, finalclass: string) {
    const qb = this.contactRepo.createQueryBuilder();
    return qb
      .where(`finalclass = "${finalclass}"`)
      .andWhere(`id = ${id}`)
      .getOne();
  }

  async findPerson(id) {
    const person = await this.personRepo.findOneBy({ id: id });
    if (!person) {
      throw new NotFoundException();
    }
    person.picture_data = Buffer.from(person.picture_data).toString('base64');
    return person;
  }

  async allPerson(filter: SearchContactDto) {
    const qb = this.contactRepo.createQueryBuilder();
    const take = filter.limit ? Number(filter.limit) : 10;
    const page = filter.page ? Number(filter.page) : undefined;
    const search = filter.search ? filter.search : undefined;
    qb.take(take);
    qb.skip(page ? page * take - take : 0);
    qb.orderBy({
      friendlyname: 'ASC',
    });
    const [items, total] = await qb
      .where('finalclass = "Person"')
      .andWhere(search ? `friendlyname LIKE "%${search}%"` : '1 = 1')
      .getManyAndCount();
    console.log(qb.getSql());
    return {
      items,
      total,
    };
  }

  findAll() {
    return this.contactRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
