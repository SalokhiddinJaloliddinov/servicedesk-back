import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController, SubcategoryController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { ServiceSubcategoryEntity } from './entities/service_subcategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceEntity, ServiceSubcategoryEntity]),
  ],
  controllers: [ServiceController, SubcategoryController],
  providers: [ServiceService],
})
export class ServiceModule {}
