import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRequestService } from './user_request.service';
import { CreateUserRequestDto } from './dto/create-user_request.dto';
import { UpdateUserRequestDto } from './dto/update-user_request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorators';
import { AuthEntity } from '../auth/entities/auth.entity';

@Controller('user-request')
export class UserRequestController {
  constructor(private readonly userRequestService: UserRequestService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @User() user: AuthEntity,
    @Body() createUserRequestDto: CreateUserRequestDto,
  ) {
    return this.userRequestService.create(createUserRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRequestService.findOne(+id);
  }

  @Get('/search')
  search(@Query('filter') filter: string) {
    return this.userRequestService.search(filter);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    return this.userRequestService.update(+id, updateUserRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRequestService.remove(+id);
  }
}
