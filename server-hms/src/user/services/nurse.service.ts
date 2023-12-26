import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response-handler';
import { CreateNurseDto } from 'src/manager/dto/create-nurse.dto';
import { UpdateNurseDto } from 'src/manager/dto/update-nurse.dto';
import { Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { NurseMapper } from '../mapper/nurser.mapper';

@Injectable()
export class NurseService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly nurseMapper: NurseMapper,
  ) {}
  async create(dto: CreateNurseDto) {
    try {
      const exits = await this.userRepository.findOne({
        where: { email: dto.email, role: { id: 4 } },
      });
      console.log('nurse-> ' + exits);
      if (exits) {
        return new ResponseHandler(
          'Nurse with the same email Already Exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const nurse = this.nurseMapper.dtoToEntity(dto);
      const entity = this.userRepository.create(nurse);
      this.userRepository.save(entity);
      return new ResponseHandler(
        'Nurse Created Successfully',
        HttpStatus.CREATED,
      );
    } catch (err) {
      console.log(err);
      return new ResponseHandler(
        'Error Creating Nurse',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const allNurse = await this.userRepository.find({
        where: { deleted_at: null, role: { id: 4 } },
        relations: {
          department: true,
          userDetails: true,
          role: true,
        },
      });
      return new ResponseHandler(allNurse, HttpStatus.OK);
    } catch (err) {
      console.log(err);
      return new ResponseHandler(
        'Error Fetching Nurses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    const nurse = await this.userRepository.findOne({
      where: { id: id, deleted_at: null, role: { id: 4 }, is_active: true },
      relations: {
        department: true,
        userDetails: true,
        role: true,
      },
    });
    if (nurse) {
      return new ResponseHandler(nurse, HttpStatus.OK);
    }
    return new ResponseHandler(
      'Nurse Not Found',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async update(dto: UpdateNurseDto) {
    try {
      const id = dto.id;
      const emailCheck = await this.userRepository.findOne({
        where: {
          role: { id: 4 },
          is_active: true,
          email: dto.email,
          id: Not(dto.id),
        },
      });
      if (emailCheck) {
        return new ResponseHandler(
          'Nurse with the same email already exist',
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userRepository.findOne({
        where: { id: id, deleted_at: null, role: { id: 4 }, is_active: true },
      });
      if (!user) {
        return new ResponseHandler(
          'Nurse Not Found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const nurse = this.nurseMapper.dtoToEntityForUpdate(dto, user);
      console.log(nurse);
      const entity = this.userRepository.create(nurse);
      this.userRepository.save(entity);
      return new ResponseHandler('Nurse Updated Successfully', HttpStatus.OK);
    } catch (err) {
      return new ResponseHandler(
        'Nurse Not Updated -> ' + err,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  private currentUserId: number;
  private currentUserRole: number;

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
}
