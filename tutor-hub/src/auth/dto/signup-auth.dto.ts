import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';
import { UserRole } from '../../enums/roles.enum';
export class SignUpAuthDto {
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
  @IsNotEmpty()
  role: UserRole;
}
