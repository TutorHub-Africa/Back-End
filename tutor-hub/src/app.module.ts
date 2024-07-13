import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { StudentAuthModule } from './auth/student-auth/student-auth.module';
import { ParentAuthModule } from './auth/parent-auth/parent-auth.module';
import { TutorAuthModule } from './auth/tutor-auth/tutor-auth.module';

@Module({
  imports: [StudentAuthModule, ParentAuthModule, TutorAuthModule, TutorModule],
=======
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ParentsModule } from './parents/parents.module';
import { TutorModule } from './tutor/tutor.module';
@Module({
  imports: [
    StudentsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tutor_hub'),
    AuthModule,
    ParentsModule,
  ],
>>>>>>> 8c9d4148f2478b7c5b8c781b346b9132013b9813
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
