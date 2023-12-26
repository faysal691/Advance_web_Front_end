import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateNurseDto } from './create-nurse.dto';

export class UpdateNurseDto extends OmitType(PartialType(CreateNurseDto), [
  'password',
  'role_id',
  'department_id',
]) {
  id: number;
}
