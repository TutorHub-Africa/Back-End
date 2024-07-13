import { IsEmail, IsString } from 'class-validator';

export class CreateTutorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
