import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from 'src/schemas/course.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EnrollCourseDto } from './dto/enroll-cours.dto';
import { EnrolledStudent } from 'src/schemas/enrolledStudent.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private CourseModel: Model<Course>,
    @InjectModel(EnrolledStudent.name)
    private EnrolledStudentModel: Model<EnrolledStudent>,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const { tutorId, title, description } = createCourseDto;
    const existingCourse = await this.CourseModel.findOne({ tutorId, title });
    if (existingCourse) {
      throw new Error('Course already exists');
    }
    const createdCourse = new this.CourseModel({
      ...createCourseDto,
    });
    return await createdCourse.save();
  }

  async findAll() {
    const courses = await this.CourseModel.find();
    if (!courses) {
      throw new Error('No courses found');
    }
    return courses;
  }

  async findOne(id: string) {
    const foundCourse = await this.CourseModel.findOne({ _id: id });
    if (!foundCourse) {
      throw new Error('Course not found');
    }
    return foundCourse;
  }
  async enroll(id: string, enrollCourseDto: EnrollCourseDto) {
    const foundCourse = await this.CourseModel.findOne({ _id: id });
    if (!foundCourse) {
      throw new Error('Course not found');
    }
    const student = await this.EnrolledStudentModel.create({
      studentId: enrollCourseDto.studentId,
      googleUrl: enrollCourseDto.googleUrl,
    });

    if (enrollCourseDto.private) {
      const foundStudent = await foundCourse.privateStudents.find(
        (student) => student.studentId === enrollCourseDto.studentId,
      );
      if (foundStudent) {
        throw new Error('Student already enrolled');
      }
      foundCourse.privateStudents.push(student);
    } else {
      const foundStudent = await foundCourse.groupStudents.find(
        (student) => student.studentId === enrollCourseDto.studentId,
      );
      foundCourse.groupStudents.push(student);
    }
    return await foundCourse.save();
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
