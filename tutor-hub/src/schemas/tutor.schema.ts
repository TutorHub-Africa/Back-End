import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SocialMedia } from './socialMedial.schema';

@Schema()
export class Tutor extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ requried: false })
  phoneNumber: string;

  @Prop({ required: false })
  shortDescription: string;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ type: SocialMedia, required: false })
  socialMedia: SocialMedia;

  @Prop()
  bio: string;

  @Prop({ type: [String], required: true })
  skills: string[];
}

export const TutorSchema = SchemaFactory.createForClass(Tutor);
