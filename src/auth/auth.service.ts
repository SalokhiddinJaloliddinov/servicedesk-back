import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(dto: LoginAuthDto) {
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
    return lastValueFrom(res);
  }

  async login(dto: LoginAuthDto) {
    const { password, ...userData } = dto;
    const payload = { login: dto.login, sub: dto.password };
    const isAuth = await this.findUser(dto);
    if (isAuth === true) {
      return {
        ...userData,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException(
        'Неправильный пароль или имя пользователя',
      );
    }
  }
}
