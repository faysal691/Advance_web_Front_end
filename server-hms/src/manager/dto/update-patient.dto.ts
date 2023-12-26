import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends OmitType(PartialType(CreatePatientDto), [
  'password',
  'role_id',
  'department_id',
]) {
  id: number;
}
