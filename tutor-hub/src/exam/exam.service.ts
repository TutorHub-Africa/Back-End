import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam } from 'src/schemas/exam.schema';
import { google } from 'googleapis';
import { ExamDto, ExamResultDto } from './dto/exam.dto';
import { Tutor } from 'src/schemas/tutor.schema';
import { ExamResult } from 'src/schemas/examResut.schema';

@Injectable()
export class ExamService {
  private calendar;
  constructor(
    @InjectModel(Exam.name) private examModel: Model<Exam>,
    @InjectModel(Tutor.name) private tutorModel: Model<Tutor>,
    @InjectModel(ExamResult.name) private examResultModel: Model<ExamResult>,
  ) {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'src/service.json',
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async addEvent(
    email: string,
    examDate: Date,
    examLink: string,
  ): Promise<void> {
    const event = {
      summary: 'Exam',
      description: `Your exam is scheduled. Please complete it using this link: ${examLink}`,
      start: {
        dateTime: examDate,
        timeZone: 'Africa/Addis_Ababa',
      },
      end: {
        dateTime: examDate, // Set appropriate end time
        timeZone: 'Africa/Addis_Ababa',
      },
      attendees: [{ email }],
    };

    await this.calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
  }

  async create(tutorId: string, examDto: ExamDto) {
    const tutorFound = await this.tutorModel.findById(tutorId);
    if (!tutorFound) {
      throw new Error('Tutor not found');
    }

    const exam = new this.examModel(examDto);
    exam.tutorId = tutorId;

    return await exam.save();
  }

  async addStudentsToExam(tutorId: string, examId: string, students: string[]) {
    const tutorFound = await this.tutorModel.findById(tutorId);
    if (!tutorFound) {
      throw new Error('Tutor not found');
    }

    const examFound = await this.examModel.findById(examId);
    if (!examFound) {
      throw new Error('Exam not found');
    }

    if (!Array.isArray(students)) {
      throw new TypeError('students must be an array');
    }

    examFound.students = [...examFound.students, ...students];
    return await examFound.save();
  }

  async getExams(tutorId: string) {
    const tutorFound = await this.tutorModel.findById(tutorId);
    if (!tutorFound) {
      throw new Error('Tutor not found');
    }

    return await this.examModel.find({ tutorId });
  }

  async getStudentExams(studentId: string) {
    return await this.examModel.find({ students: studentId });
  }

  async addResult(tutorId: string, examResultDto: ExamResultDto) {
    const tutorFound = await this.tutorModel.findById(tutorId);
    if (!tutorFound) {
      throw new Error('Tutor not found');
    }

    const examFound = await this.examModel.findById(examResultDto.examId);
    if (!examFound) {
      throw new Error('Exam not found');
    }

    const examResult = new this.examResultModel({
      studentId: examResultDto.studentId,
      tutorId,
      examId: examResultDto.examId,
      course: examResultDto.course,
      examTitle: examResultDto.examTitle,
      score: examResultDto.score,
    });
    return await examResult.save();
  }

  async getStudentResults(studentId: string) {
    return await this.examResultModel.find({ studentId });
  }
}
