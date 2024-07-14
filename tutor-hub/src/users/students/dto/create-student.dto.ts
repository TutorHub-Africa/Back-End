import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
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

  @IsNotEmpty()
  @IsNumber()
  age: number;

  parent: string;
}
