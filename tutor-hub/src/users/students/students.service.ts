import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../../schemas/student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.StudentModel({
      ...createStudentDto,
    });
    return createdStudent.save();
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
