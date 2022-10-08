import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorators';
import { IpAddress } from '../decorators/ip.decorators';

import { Ip } from '@nestjs/common';
import { chechRole } from '../decorators/checkRole.decorators';

@UseGuards(JwtAuthGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @User() userId: number) {
    return this.ticketService.create(createTicketDto, userId);
  }

  @Get('/incident')
  findIncident(@Query() filter: any, @chechRole() id) {
    console.log('role', id);
    return this.ticketService.findTickets('Incident', filter);
  }

  @Get('/user-request')
  findUserRequest(@Query() filter: any) {
    return this.ticketService.findTickets('UserRequest', filter);
  }

  @Get('/delivery-request')
  findDeliveryRequest(@Query() filter: any) {
    return this.ticketService.findTickets('DeliveryRequest', filter);
  }

  @Get('/incident/:id')
  findOneIncident(@Param('id') id: string) {
    return this.ticketService.findOne(+id, 'Incident');
  }
  @Get('/user-request/:id')
  findOneUserRequest(@Param('id') id: string) {
    return this.ticketService.findOne(+id, 'UserRequest');
  }
  @Get('/delivery-request/:id')
  findOneDeliveryRequest(@Param('id') id: string) {
    return this.ticketService.findOne(+id, 'DeliveryRequest');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
