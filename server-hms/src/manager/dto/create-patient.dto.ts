import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @MinLength(4)
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  @IsString()
  @MinLength(4)
  address: string;
  @IsString()
  @Matches(/^[0-9]{11}$/)
  phone: string;
  @IsNumber()
  role_id: number;
  @IsNumber()
  department_id: number;
}
