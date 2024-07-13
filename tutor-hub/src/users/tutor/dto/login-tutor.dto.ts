import { IsEmail, IsString } from 'class-validator';

export class LoginTutorDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
