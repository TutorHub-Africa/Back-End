import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Student extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  age: number;

  @Prop({ required: false })
  imageUrl: string;

  parent: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
