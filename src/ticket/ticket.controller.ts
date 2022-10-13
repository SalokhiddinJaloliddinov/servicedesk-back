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

import { chechRole } from '../decorators/checkRole.decorators';
import { CreatePublicLogDto } from './dto/create-publicLog.dto';

@UseGuards(JwtAuthGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @User() userData: any) {
    return this.ticketService.create(createTicketDto, userData.contact_id);
  }

  @Post('/public-log')
  addComment(
    @Body() createCommentDto: CreatePublicLogDto,
    @User() userData: any,
  ) {
    return this.ticketService.addPublicLog(createCommentDto, userData.user_id);
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
  @Get('/incident/:id/public-log')
  publicLogIncident(@Param('id') id: string) {
    return this.ticketService.publicLog(+id, 'Incident');
  }
  @Get('/user-request/:id/public-log')
  publicLogUserRequest(@Param('id') id: string) {
    return this.ticketService.publicLog(+id, 'UserRequest');
  }
  @Get('/delivery-request/:id/public-log')
  publicLogDeliveryRequest(@Param('id') id: string) {
    return this.ticketService.publicLog(+id, 'DeliveryRequest');
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
