import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from 'src/schemas/exam.schema';
import { Tutor, TutorSchema } from 'src/schemas/tutor.schema';
import { ExamResult, ExamResultSchema } from 'src/schemas/examResut.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tutor.name, schema: TutorSchema }]),
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }]),
    MongooseModule.forFeature([
      { name: ExamResult.name, schema: ExamResultSchema },
    ]),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
