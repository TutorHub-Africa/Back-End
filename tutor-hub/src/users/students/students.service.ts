import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { LogInStudentDto } from './dto/login-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../../schemas/student.schema';
import { StudentAuthService } from 'src/auth/student-auth/student-auth.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentAuth } from 'src/auth/student-auth/dtos/studentAuth.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<Student>,
    private authService: StudentAuthService,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const { firstName, lastName, email, userName, password, age, parent } =
      createStudentDto;
    const hashedPassword = await this.authService.hashPassword(password);
    const createdStudent = new this.StudentModel({
      firstName,
      lastName,
      email,
      userName,
      password: hashedPassword,
      age,
      parent,
    });
    return createdStudent.save();
  }
  async logIn(logInStudentDto: LogInStudentDto) {
    const { email, userName, password } = logInStudentDto;
    const student = await this.StudentModel.findOne({
      email,
      userName,
    });
    if (!student) {
      throw new BadRequestException('user not found');
    }
    const match = await this.authService.comparePassword(
      password,
      student.password,
    );
    if (!match) {
      throw new BadRequestException('Incorrect password');
    }

    const token = this.authService.generateToken(
      new StudentAuth(student._id.toString(), student.userName, student.email),
    );
    return token;
  }

  async findAll() {
    const tutorsFound = await this.StudentModel.find();
    if (!tutorsFound) {
      throw new NotFoundException('No tutors found');
    }
    return tutorsFound;
  }

  async findOne(id: string) {
    const studentFound = await this.StudentModel.findOne({
      $or: [{ _id: id }],
    });

    if (!studentFound) {
      throw new NotFoundException('Tutor not found');
    }

    return studentFound;
  }
  async AddImagePath(id: string, filename: string) {
    if (!id) {
      return 'No image Id provided';
    }

    const student = await this.StudentModel.findOne({ _id: id });
    student.imageUrl = `src/images/tutorProfiles/${filename}`;

    return await student.save();
  }
  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const tutorFound = await this.findOne(id);
    if (!tutorFound) {
      throw new NotFoundException('Tutor not found');
    }

    return await this.StudentModel.findByIdAndUpdate(id, updateStudentDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
