import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RolesEntity } from '../roles/entities/roles.entity';

export const chechRole = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.role;
  },
);
