import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateManagerDto } from './create-manager.dto';
import {
  IsString,
  MinLength,
  IsEmail,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateManagerDto {
  @IsString()
  @MinLength(4)
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(4)
  address: string;
  @IsString()
  @Matches(/^[0-9]{11}$/)
  phone: string;
}
