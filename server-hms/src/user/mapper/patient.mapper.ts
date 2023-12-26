import { Department } from 'src/department/entities/department.entity';
import { CreatePatientDto } from 'src/manager/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/manager/dto/update-patient.dto';
import { Roles } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { UserDetails } from '../entities/userDetails.entity';

export class PatientMapper {
  dtoToEntity(dto: CreatePatientDto) {
    const user = new User();
    const userDetails = new UserDetails();
    const department = new Department();
    const role = new Roles();
    user.email = dto.email;
    user.password = dto.password;
    userDetails.name = dto.name;
    userDetails.phone = dto.phone;
    userDetails.address = dto.address;
    user.userDetails = userDetails;
    department.id = dto.department_id;
    user.department = department;
    role.id = 5;
    user.role = role;
    return user;
  }
  dtoToEntityForUpdate(dto: UpdatePatientDto, user: User) {
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
