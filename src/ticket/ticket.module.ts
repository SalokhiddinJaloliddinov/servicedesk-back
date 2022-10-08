import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentEntity } from './entities/incident.entity';
import { UserRequestEntity } from './entities/user_request.entity';
import { HttpModule } from '@nestjs/axios';
import { DeliveryRequestEntity } from './entities/delivery_request.entity';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IncidentEntity,
      UserRequestEntity,
      DeliveryRequestEntity,
    ]),
    HttpModule,
    ContactModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
