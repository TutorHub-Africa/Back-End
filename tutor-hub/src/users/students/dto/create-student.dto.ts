import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}
