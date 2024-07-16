import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class FilterCourseDto {
  @IsOptional()
  @IsString()
  tutorId?: string;
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  grade?: number;

  @IsOptional()
  @IsBoolean()
  evaluation?: boolean;

  @IsOptional()
  @IsNumber()
  durationPerDay?: number;

  @IsOptional()
  @IsNumber()
  rate?: number;
}
