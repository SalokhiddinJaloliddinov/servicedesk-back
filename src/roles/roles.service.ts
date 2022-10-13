import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { RolesController } from './roles.controller';
import { LnkRoleToUserEntity } from './entities/lnkRoleToUser.entity';
import { response } from 'express';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepo: Repository<RolesEntity>,
    @InjectRepository(LnkRoleToUserEntity)
    private lnkRoleToUserRepo: Repository<LnkRoleToUserEntity>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    const data = await this.lnkRoleToUserRepo.find({ where: { userid: 11 } });
    return data.map((response) => response.profileid);
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
