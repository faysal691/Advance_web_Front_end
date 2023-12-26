import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response-handler';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDetails } from './entities/userDetails.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserDetails)
    private userDetailsRepository: Repository<UserDetails>,
  ) {}

  private currentUserId: number;
  private currentUserRole: number;

  async upload(id: number, file: any) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });

      const details = user.userDetails;
      details.avatar = file;
      console.log(file);
      await this.userDetailsRepository.update(details.id, details);
      return new ResponseHandler(
        'profile pic uploaded succesfully',
        HttpStatus.OK,
      );
    } catch (err) {
      console.log(err);
      return new ResponseHandler('Error', 400);
    }
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository
      .findOne({
        where: {
          email: email,
        },
      })
      .then((user) => {
        return user;
      });
  }

  setCurrentUserId(userId: number): void {
    this.currentUserId = userId;
  }

  getCurrentUserId(): number {
    return this.currentUserId;
  }
  setCurrentUserRole(roleId: number): void {
    this.currentUserRole = roleId;
  }
  getCurrentUserRole(): number {
    return this.currentUserRole;
  }

  getManagerProfile() {
    return this.userRepository.findOne({
      where: { id: this.getCurrentUserId() },
      relations: ['userDetails'],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          userDetails: 'user.userDetails',
        },
      },
    });
  }
}
