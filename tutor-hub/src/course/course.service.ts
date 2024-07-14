import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from 'src/schemas/course.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private CourseModel: Model<Course>) {}
  create(createCourseDto: CreateCourseDto) {
    const { tutorId, title, description } = createCourseDto;
    const existingCourse = this.CourseModel.findOne({ tutorId, title });
    if (existingCourse) {
      throw new Error('Course already exists');
    }
    const createdCourse = new this.CourseModel({
      ...createCourseDto,
    });
    return createdCourse.save();
  }

  findAll() {
    const courses = this.CourseModel.find();
    if (!courses) {
      throw new Error('No courses found');
    }
    return courses;
  }

  findOne(id: string) {
    const existingCourses = this.CourseModel.find({ tutorId: id });
    if (!existingCourses) {
      throw new Error('Course not found');
    }
    return existingCourses;
  }
  enroll(id: string) {}

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
