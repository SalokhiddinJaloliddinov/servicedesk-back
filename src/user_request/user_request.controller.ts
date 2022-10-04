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
    @User() userId: number,
    @Body() createUserRequestDto: CreateUserRequestDto,
  ) {
    console.log(userId);
    return this.userRequestService.create(createUserRequestDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  asCaller(@User() userId: number, @Query() page: any) {
    return this.userRequestService.findAllAs(userId, page);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/agent')
  // asAgent(@User() userId: number, @Query() page: any) {
  //   return this.userRequestService.findAllAsAgent(userId, page);
  // }

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
