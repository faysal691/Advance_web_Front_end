import { CreateDoctorDto } from 'src/manager/dto/create-doctor.dto';
import { UpdateManagerDto } from 'src/manager/dto/update-manager.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export class UserUpdateMapper {
  dtoToEntity(
    dto: UpdateUserDto | UpdateManagerDto | CreateDoctorDto,
    user: User,
  ) {
    const entity = user;
    const userDetails = user.userDetails;
    if (dto.email) {
      entity.email = dto.email;
    }

    if (dto.name) {
      userDetails.name = dto.name;
    }
    if (dto.phone) {
      userDetails.phone = dto.phone;
    }
    if (dto.address) {
      userDetails.address = dto.address;
    }
    if (dto.name || dto.phone || dto.address) {
      entity.userDetails = userDetails;
    }
    return entity;
  }
}
