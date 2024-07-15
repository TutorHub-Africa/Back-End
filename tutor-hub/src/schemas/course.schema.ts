import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnrolledStudent } from './enrolledStudent.schema';

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  tutorId: string;

  @Prop({ type: [EnrolledStudent], default: [] })
  privateStudents: EnrolledStudent[];

  @Prop({ type: [EnrolledStudent], default: [] })
  groupStudents: EnrolledStudent[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
