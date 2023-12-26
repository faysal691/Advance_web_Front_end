import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CustomHttpException } from 'src/common/custom-http-exception';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userRole = request.session.role;
    console.log('RoleGuard: ', userRole);

    if (userRole !== 2) {
      const errorMessage =
        'You do not have the required role to access this resource';
      throw new CustomHttpException(errorMessage, 'Forbidden', 403);
    }

    return true;
  }
}
