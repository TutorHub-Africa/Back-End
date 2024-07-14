import { IsString, IsOptional, IsNumber } from 'class-validator';
import { SocialMedia } from 'src/schemas/socialMedial.schema';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNumber()
  @IsOptional()
  age: number;
}
