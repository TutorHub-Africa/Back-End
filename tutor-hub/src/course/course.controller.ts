import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { TutorJwtAuthGuard } from 'src/auth/tutor-auth/guards/jwt-tutorAuth.guard';
import { EnrollCourseDto } from './dto/enroll-cours.dto';
import { FilterCourseDto } from './dto/filter-course.dto';
import { Course } from 'src/schemas/course.schema';
import { AddCommentDto } from './dto/add-comment.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  // @UseGuards(TutorJwtAuthGuard)
  create(@Request() req, @Body() createCourseDto: CreateCourseDto) {
    // createCourseDto.tutorId = req.user.sub;
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get('filter')
  async filterCourses(
    @Query() filterCourseDto: FilterCourseDto,
  ): Promise<Course[]> {
    return this.courseService.filterCourses(filterCourseDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Post(':id/enroll')
  enroll(@Param('id') id: string, @Body() enrollCourseDto: EnrollCourseDto) {
    return this.courseService.enroll(id, enrollCourseDto);
  }

  @Delete(':id/dropout/:studentId')
  async dropOut(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
  ): Promise<Course> {
    return this.courseService.dropOut(id, studentId);
  }
  @Post(':courseId/comment')
  async addComment(
    @Param('courseId') courseId: string,
    @Body()
    addCommentDto: AddCommentDto,
  ) {
    return this.courseService.addComment(courseId, addCommentDto);
  }

  @Get(':courseId/comments')
  async getComments(@Param('courseId') courseId: string) {
    return this.courseService.getComments(courseId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
