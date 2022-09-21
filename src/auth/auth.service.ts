import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private repository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async findUser(dto) {
    // const login = await this.repository.findOneBy({ login: dto.login });
    // const id = await this.repository.findOneBy({ id: dto.id });
    // if (login === id) {
    //   return await this.repository.findOneBy({ id: dto.id });
    // }
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

  // async login(dto: LoginAuthDto) {
  //   const { password, ...userData } = dto;
  //   const payload = { login: dto.login, sub: dto.password };
  //   const isAuth = await this.findUser(dto);
  //   if (isAuth === true) {
  //     return {
  //       ...userData,
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   } else {
  //     throw new UnauthorizedException(
  //       'Неправильный пароль или имя пользователя',
  //     );
  //   }
  // }

  async login(dto: LoginAuthDto) {
    const user = await this.checkUser(dto);
    const payload = { login: dto.login, sub: user.id };
    if (user) {
      return {
        ...user,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException(
        'Неправильный пароль или имя пользователя',
      );
    }
  }
}
