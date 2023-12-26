import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/common/email.service';
import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Roles } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { UserDetails } from 'src/user/entities/userDetails.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { SessionGuard } from './auth.guards';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BaseEntity, SessionGuard, UserService,EmailService],
  imports: [
    TypeOrmModule.forFeature([User, UserDetails, Roles, BaseEntity]),
    forwardRef(() => UserModule),
  ],
  exports: [SessionGuard],
})
export class AuthModule {}
