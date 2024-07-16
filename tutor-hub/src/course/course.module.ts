import { Module, forwardRef } from '@nestjs/common';
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
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Tutor, TutorSchema } from 'src/schemas/tutor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([
      { name: EnrolledStudent.name, schema: EnrolledStudentSchema },
    ]),
    MongooseModule.forFeature([{ name: Tutor.name, schema: TutorSchema }]),
    forwardRef(() => TutorAuthModule),
    TutorAuthModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, TutorAuthService],
})
export class CourseModule {}
