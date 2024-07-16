import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Exam {
  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  tutorId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  examTitle: string;

  @Prop({ required: true })
  examDate: Date;

  @Prop({ required: false })
  students: string[];
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
