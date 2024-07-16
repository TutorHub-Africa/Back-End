import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SocialMedia } from './socialMedial.schema';

export interface feedback {
  studentId: string;
  studentName: string;
  text: string;
  rating: number;
}

@Schema()
class FeedbackSchema extends Document {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  studentName: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

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

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  googleId: string;

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

  @Prop({ type: [FeedbackSchema], required: false })
  feedback: feedback[];
}

export const TutorSchema = SchemaFactory.createForClass(Tutor);
