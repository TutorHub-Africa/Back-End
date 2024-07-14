import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { SignInStudentDto } from './dto/signin-student.dto';
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
  async signIn(signInStudentDto: SignInStudentDto) {
    const { email, userName, password } = signInStudentDto;
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

  findAll() {
    return `This action returns a  student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }
  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action returns a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
