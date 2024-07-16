import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ExamResult {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  tutorId: string;

  @Prop({ required: true })
  examId: string;

  @Prop({ required: true })
  course: string;

  @Prop({ required: true })
  examTitle: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  total: number;
}

export const ExamResultSchema = SchemaFactory.createForClass(ExamResult);
