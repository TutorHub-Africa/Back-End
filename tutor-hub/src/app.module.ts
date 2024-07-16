import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './users/students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorAuthModule } from './auth/tutor-auth/tutor-auth.module';
import { StudentAuthModule } from './auth/student-auth/student-auth.module';
import { ParentAuthModule } from './auth/parent-auth/parent-auth.module';
import { TutorModule } from './users/tutor/tutor.module';
import { ParentsModule } from './users/parents/parents.module';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    StudentsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tutor_hub'),
    TutorAuthModule,
    StudentAuthModule,
    ParentAuthModule,
    TutorModule,
    ParentsModule,
    ExamModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
