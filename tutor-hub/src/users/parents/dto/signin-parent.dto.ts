import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class SignInParentDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}
