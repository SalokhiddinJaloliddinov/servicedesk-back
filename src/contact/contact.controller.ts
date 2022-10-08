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
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get('/team')
  findAllTeam(@Query() filter: any) {
    return this.contactService.allTeam(filter);
  }

  @Get('/person')
  findAllPerson(@Query() filter: any) {
    return this.contactService.allPerson(filter);
  }

  @Get('/team/:id')
  OneTeam(@Param('id') id: string) {
    return this.contactService.findContact(+id, 'Team');
  }

  @Get('/person/:id')
  OnePerson(@Param('id') id: string) {
    return this.contactService.findPerson(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
