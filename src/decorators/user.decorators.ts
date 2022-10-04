import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthEntity } from '../auth/entities/auth.entity';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.contact_id;
  },
);
