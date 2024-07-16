import { Type } from 'class-transformer';
import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { SocialMedia } from 'src/schemas/socialMedial.schema';
import { feedback } from 'src/schemas/tutor.schema';

export class UpdateTutorDto {
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @ValidateNested()
  @Type(() => SocialMedia)
  @IsOptional()
  socialMedia: SocialMedia;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  skills: string[];

  @IsOptional()
  feedback: feedback[];
}
