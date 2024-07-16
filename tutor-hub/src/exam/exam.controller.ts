import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamDto, ExamResultDto } from './dto/exam.dto';
import { TutorJwtAuthGuard } from 'src/auth/tutor-auth/guards/jwt-tutorAuth.guard';
import { StudentJwtAuthGuard } from 'src/auth/student-auth/guards/jwt-studentAuth.guard';

@Controller('exam')
export class ExamController {
  constructor(private examService: ExamService) {}

  // Create an exam
  @Post('/create')
  @UseGuards(TutorJwtAuthGuard)
  async createExam(@Request() req, @Body() examDto: ExamDto) {
    return this.examService.create(req.user.sub, examDto);
  }

  // admit students to an exam
  @Patch('/admit/:examId')
  @UseGuards(TutorJwtAuthGuard)
  async admitStudents(@Request() req, @Param('examId') examId, @Body() body) {
    return this.examService.addStudentsToExam(
      req.user.sub,
      examId,
      body.students,
    );
  }

  // get all exams of a tutor
  @Get()
  @UseGuards(TutorJwtAuthGuard)
  async getExams(@Request() req) {
    return this.examService.getExams(req.user.sub);
  }

  // get all exams of a student
  @Get('/student')
  @UseGuards(StudentJwtAuthGuard)
  async getStudentExams(@Request() req) {
    return this.examService.getStudentExams(req.user.sub);
  }

  @Post('/result')
  @UseGuards(TutorJwtAuthGuard)
  async addResult(@Request() req, @Body() ExamResult: ExamResultDto) {
    return this.examService.addResult(req.user.sub, ExamResult);
  }

  @Get('/students/result')
  @UseGuards(StudentJwtAuthGuard)
  async getStudentResults(@Request() req) {
    return this.examService.getStudentResults(req.user.sub);
  }
}
