import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { LnkRoleToUserEntity } from './entities/lnkRoleToUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity, LnkRoleToUserEntity])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
