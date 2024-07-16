import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  tutorId: string;

  @IsNotEmpty()
  @IsString()
  tutorName: string;

  @IsNotEmpty()
  @IsNumber()
  grade?: number;

  @IsNotEmpty()
  @IsNumber()
  fee: number;

  @IsOptional()
  @IsNumber()
  durationPerDay?: number;

  @IsNotEmpty()
  @IsBoolean()
  evaluation: boolean;

  @IsNotEmpty()
  @IsNumber()
  seatsRemaining: number;
}
