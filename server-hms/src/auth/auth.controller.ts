import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import session from 'express-session';
import { Roles } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SessionGuard } from './auth.guards';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}
  @Get('index')
  @UseGuards(SessionGuard)
  getIndex(@Session() session) {
    console.log(session.email);
    return this.authService.getAll();
  }
  @Post('login')
  async login(@Body() dto: LoginDto, @Session() session) {
    if (await this.authService.login(dto, session)) {
      return {
        message: 'Login successful',
        session: session,
      };
    } else {
      throw new HttpException(
        'Credential are incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  @Get('/logout')
  @UseGuards(SessionGuard)
  logout(@Session() session) {
    session.email = undefined;
    session.role = undefined;
    return 'logout successfully';
  }
  @Post('/signup')
  signUp(@Body() signUpDto: SignupDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }
  @Get('/getUserByID')
  @UseGuards(SessionGuard)
  getUserByID(@Session() session, @Query('id') id): Promise<User> {
    console.log(session.email);
    console.log(session.role);
    console.log(session);
    return this.authService.getUserByID(id);
  }
  @Post('roles')
  async createRoles(@Body() rolesData: { name: string; is_active: boolean }[]) {
    try {
      const createdRoles = await this.rolesRepository.save(rolesData);
      return {
        message: 'Roles created successfully',
        roles: createdRoles,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create roles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
