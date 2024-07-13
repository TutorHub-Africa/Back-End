import { IsString, IsOptional } from 'class-validator';
import { SocialMedia } from 'src/schemas/socialMedial.schema';

export class UpdateTutorDto {
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsString()
  @IsOptional()
  socialMedia: SocialMedia;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  skills: string[];
}
