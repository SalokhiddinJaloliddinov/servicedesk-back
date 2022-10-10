import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Buffer } from 'buffer';

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
      id: payload.id,
      login: payload.login,
      contactid: payload.person_id,
      arg: payload.arg,
    };
    const user = await this.authService.findUser(userData);
    if (user) {
      const person = await this.authService.person(user.contactid);
      console.log(person, 'maymun');
      const decrypt = await this.authService.decrypt(userData);
      console.log(user);
      console.log(decrypt);
      if (!user) {
        throw new UnauthorizedException('Нету прав на эту страницу');
      } else if (!decrypt) {
        throw new UnauthorizedException('Нету прав на эту страницу');
      } else {
        return {
          login: user.login,
          user_id: user.id,
          contact_id: user.contactid,
          person_friendlyname: person.friendlyname,
          status: user.status,
          role: [1, 2, 3],
        };
      }
    }
  }
}
