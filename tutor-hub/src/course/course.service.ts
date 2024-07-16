import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from 'src/schemas/course.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EnrollCourseDto } from './dto/enroll-cours.dto';
import { EnrolledStudent } from 'src/schemas/enrolledStudent.schema';
import { FilterCourseDto } from './dto/filter-course.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Tutor } from 'src/schemas/tutor.schema';
import { ResourceItemDto } from './dto/resource-item.dto';
import { Student } from 'src/schemas/student.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private CourseModel: Model<Course>,
    @InjectModel(EnrolledStudent.name)
    private EnrolledStudentModel: Model<EnrolledStudent>,
    @InjectModel(Comment.name) private readonly CommentModel: Model<Comment>,
    @InjectModel(Tutor.name) private TutorModel: Model<Tutor>,
    @InjectModel(Student.name) private StudentModel: Model<Student>,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const {
      tutorId,
      title,
      description,
      subject,
      grade,
      durationPerDay,
      evaluation,
      seatsRemaining,
      fee,
    } = createCourseDto;
    const tutor = await this.TutorModel.findById(tutorId);
    if (!tutor) {
      throw new Error('Tutor not found');
    }

    const existingCourse = await this.CourseModel.findOne({ tutorId, title });
    if (existingCourse) {
      throw new Error('Course already exists');
    }

    // Create a new course instance
    const createdCourse = new this.CourseModel({
      tutorName: tutor.firstName + ' ' + tutor.lastName,
      tutorId,
      title,
      description,
      grade,
      durationPerDay,
      evaluation,
      subject,
      seatsRemaining,
      fee,
      comments: [],
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
  async filterCourses(filterCourseDto: FilterCourseDto) {
    const { tutorId, grade, evaluation, durationPerDay, rate, title, subject } =
      filterCourseDto;

    const filterQuery: any = {};

    if (tutorId) {
      filterQuery.tutorId = tutorId;
    }
    if (subject) {
      filterQuery.subject = subject;
    }
    if (title) {
      filterQuery.title = { $regex: title, $options: 'i' };
    }

    if (grade) {
      filterQuery.grade = +grade;
    }

    if (evaluation !== undefined) {
      filterQuery.evaluation = evaluation;
    }

    if (durationPerDay !== undefined) {
      filterQuery.durationPerDay = { $lte: durationPerDay };
    }

    if (rate !== undefined) {
      filterQuery.rate = rate;
    }
    const sortBy = 'rate';
    const sortOrder = 'desc';

    return await this.CourseModel.find(filterQuery)
      .sort({ [sortBy]: sortOrder })
      .exec();
  }

  async findOne(id: string) {
    const foundCourse = await this.CourseModel.findOne({ _id: id });
    if (!foundCourse) {
      throw new Error('Course not found');
    }
    return foundCourse;
  }
  async addResource(id: string, resourceItemDto: ResourceItemDto) {
    const foundCourse = await this.CourseModel.findOne({ _id: id });
    if (!foundCourse) {
      throw new Error('Course not found');
    }
    const { type, title, url } = resourceItemDto;
    if (!type || !title || !url) {
      throw new Error('Invalid resource item');
    }
    const resource = { title, url };
    if (type === 'video') {
      foundCourse.resources.video.push(resource);
    } else if (type === 'book') {
      foundCourse.resources.book.push(resource);
    } else {
      throw new Error('Invalid resource type');
    }
    return await foundCourse.save();
  }

  async enroll(id: string, enrollCourseDto: EnrollCourseDto) {
    const foundCourse = await this.CourseModel.findOne({ _id: id });
    if (!foundCourse) {
      throw new Error('Course not found');
    }
    if (foundCourse.seatsRemaining === 0) {
      throw new Error('No seats available');
    }
    const student = await this.EnrolledStudentModel.create({
      studentId: enrollCourseDto.studentId,
      googleUrl: enrollCourseDto.googleUrl,
    });

    const foundStudent = foundCourse.enrolledStudents.find(
      (student) => student.studentId === enrollCourseDto.studentId,
    );
    if (foundStudent) {
      throw new Error('Student already enrolled');
    }
    foundCourse.enrolledStudents.push(student);
    foundCourse.seatsRemaining -= 1;

    return await foundCourse.save();
  }
  async dropOut(id: string, studentId: string) {
    const foundCourse = await this.CourseModel.findOne({ _id: id });
    if (!foundCourse) {
      throw new Error('Course not found');
    }
    const foundStudent = foundCourse.enrolledStudents.find(
      (student) => student.studentId === studentId,
    );
    if (!foundStudent) {
      throw new Error('Student not enrolled');
    }
    foundCourse.enrolledStudents = foundCourse.enrolledStudents.filter(
      (student) => student.studentId !== studentId,
    );
    foundCourse.seatsRemaining += 1;

    return await foundCourse.save();
  }
  async addComment(courseId: string, addCommentDto: AddCommentDto) {
    const { studentId, text, rating } = addCommentDto;
    const course = await this.CourseModel.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    const student = await this.StudentModel.findOne({ _id: studentId });
    if (!student) {
      throw new Error('Student not found');
    }
    const studentName = student.firstName + ' ' + student.lastName;
    course.comments = course.comments.filter(
      (comment) => comment.studentId !== studentId,
    );
    const comment = await this.CommentModel.create({
      studentId,
      studentName,
      text,
      rating,
    });
    course.comments.push(comment);

    await course.save();

    return comment;
  }
  async getComments(courseId: string) {
    const course =
      await this.CourseModel.findById(courseId).populate('comments');
    if (!course) {
      throw new Error('Course not found');
    }

    return course.comments;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
