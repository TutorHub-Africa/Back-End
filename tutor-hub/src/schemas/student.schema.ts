import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Student extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
