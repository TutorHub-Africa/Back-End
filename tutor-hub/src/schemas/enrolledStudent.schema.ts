import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EnrolledStudent extends Document {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: false })
  googleUrl: string;
}

export const EnrolledStudentSchema =
  SchemaFactory.createForClass(EnrolledStudent);
