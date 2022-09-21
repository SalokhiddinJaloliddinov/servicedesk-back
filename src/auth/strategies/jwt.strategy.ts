import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'test',
    });
  }

  async validate(payload: any) {
    const userData = {
      id: payload.sub,
      login: payload.login,
    };
    const user = await this.authService.findUser(userData);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Нету прав на эту страницу');
    }
    return {
      login: user.login,
      user_id: user.id,
      person_id: user.contactid,
      status: user.status,
    };
  }
}
