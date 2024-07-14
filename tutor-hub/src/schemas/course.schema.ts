import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  tutorId: string;

  @Prop({ type: [String], default: [] })
  privateStudents: string[];

  @Prop({ type: [String], default: [] })
  groupStudents: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
