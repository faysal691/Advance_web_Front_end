import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BaseEntity } from 'src/entities/baseEntity.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly baseEntity: BaseEntity,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionEmail = request.session.email;
    if (sessionEmail) {
      const user = await this.userService.getUserByEmail(sessionEmail);
      const id = user ? user.id : 1;
      console.log('SessionGuard: ', user.role.id);
      // Set the user ID in the BaseEntity
      this.baseEntity.setCreated_by(id);
      this.baseEntity.setUpdated_by(id);
      this.userService.setCurrentUserId(id);
      this.userService.setCurrentUserRole(user.role.id);

      return true;
    }

    return false;
  }
}
