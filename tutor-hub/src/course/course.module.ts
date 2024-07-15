import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schemas/course.schema';
import { TutorAuthModule } from 'src/auth/tutor-auth/tutor-auth.module';
import { TutorAuthService } from 'src/auth/tutor-auth/tutor-auth.service';
import {
  EnrolledStudent,
  EnrolledStudentSchema,
} from 'src/schemas/enrolledStudent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([
      { name: EnrolledStudent.name, schema: EnrolledStudentSchema },
    ]),
    TutorAuthModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, TutorAuthService],
})
export class CourseModule {}
