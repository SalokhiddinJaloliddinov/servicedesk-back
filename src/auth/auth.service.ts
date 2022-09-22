import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from '../person/entities/person.entity';
import { PersonService } from '../person/person.service';
import { isBase32, isBase64, isHexadecimal, isString } from 'class-validator';
import { Buffer } from 'buffer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private repository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
    private readonly personService: PersonService,
    private readonly httpService: HttpService,
  ) {}

  async findUser(dto) {
    return await this.repository.findOneBy({ id: dto.id });
  }

  async checkUser(dto: LoginAuthDto) {
    const json_data = {
      operation: 'core/check_credentials',
      user: dto.login,
      password: dto.password,
    };
    const req = this.httpService.post(
      process.env.ITOP_URL +
        '/webservices/rest.php?version=1.3&json_data=' +
        JSON.stringify(json_data),
      {},
      {
        auth: {
          username: process.env.ITOP_USERNAME,
          password: process.env.ITOP_PASSWORD,
        },
      },
    );
    const res = req.pipe(map((response) => response.data.authorized));
    const isAuth = await lastValueFrom(res);

    if (isAuth === true) {
      return this.repository.findOneBy({ login: dto.login });
    } else {
      throw new UnauthorizedException(
        'Неправильный пароль или имя пользователя',
      );
    }
  }
  // }

  async login(dto: LoginAuthDto) {
    const qb = this.repository.createQueryBuilder('u');

    const user = await this.checkUser(dto);
    const person = await this.personService.findOne(user.contactid);
    const payload = {
      id: user.id,
      login: user.login,
      friendlyname: person.friendlyname,
      person_id: person.id,
    };
    delete user.contactid;
    delete person.picture_data;
    if (user) {
      return {
        user,
        person,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException(
        'Неправильный пароль или имя пользователя',
      );
    }

    // return this.repository.find();
  }
}
