import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';
import { Permission } from '../interfaces/permission.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return this.matchPermissions(requiredPermissions, user.permissions);
  }

  private matchPermissions(
    required: Permission[],
    userPermissions: Permission[],
  ): boolean {
    return required.every((permission) =>
      userPermissions.some(
        (userPerm) =>
          userPerm.resource === permission.resource &&
          userPerm.action === permission.action,
      ),
    );
  }
}
