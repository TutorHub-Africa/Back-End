import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../../schemas/student.schema';
import { StudentAuthService } from 'src/auth/student-auth/student-auth.service';
import { StudentAuthModule } from 'src/auth/student-auth/student-auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    forwardRef(() => StudentAuthModule),
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentAuthService],
  exports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
})
export class StudentsModule {}
