import { Module } from '@nestjs/common';
import { UserRequestService } from './user_request.service';
import { UserRequestController } from './user_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRequestEntity } from './entities/user_request.entity';
import { HttpModule } from '@nestjs/axios';
import { ContactService } from '../contact/contact.service';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRequestEntity]),
    HttpModule,
    ContactModule,
  ],
  controllers: [UserRequestController],
  providers: [UserRequestService],
})
export class UserRequestModule {}
