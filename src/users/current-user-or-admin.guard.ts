import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { User } from '../auth/user.entity';

import { Role } from '../auth/enums/role.enum';

@Injectable()
export class CurrentUserOrAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user: User = request.user;

    const params = request.params;
    const userId = +params.id;

    return user.id === userId || user.role === Role.ADMIN;
  }
}
