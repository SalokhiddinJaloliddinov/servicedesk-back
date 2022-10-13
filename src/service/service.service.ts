import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Repository } from 'typeorm';
import { Expose } from 'class-transformer';
import { response } from 'express';
import { ServiceSubcategoryEntity } from './entities/service_subcategory.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private repository: Repository<ServiceEntity>,
    @InjectRepository(ServiceSubcategoryEntity)
    private subRepo: Repository<ServiceSubcategoryEntity>,
  ) {}
  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  async findAll() {
    const data = await this.repository.find();
    data.map((response) => delete response.icon_data);
    return data;
  }

  async findOne(id: number) {
    const data = await this.repository.findOneBy({ id: id });
    data.icon_data = Buffer.from(data.icon_data).toString('base64');
    return data;
  }

  async findSubAll() {
    return this.subRepo.find();
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
