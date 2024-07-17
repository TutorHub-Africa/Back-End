import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { LogInStudentDto } from './dto/login-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentJwtAuthGuard } from 'src/auth/student-auth/guards/jwt-studentAuth.guard';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

@Controller('student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('/create-Account')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudent(createStudentDto);
  }
  @Post('login')
  logIn(@Body() logInStudentDto: LogInStudentDto) {
    return this.studentsService.logIn(logInStudentDto);
  }

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/images/studentsProfiles',
        filename: (req, file, callback) => {
          // Generate a unique filename
          const fileExtension = file.originalname.split('.').pop();
          const filename = `${uuidv4()}.${fileExtension}`;
          callback(null, filename);
          return filename;
        },
      }),
    }),
  )
  @UseGuards(StudentJwtAuthGuard)
  async uploadImage(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.studentsService.AddImagePath(req.user.sub, file.filename);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch('/update-profile')
  @UseGuards(StudentJwtAuthGuard)
  update(@Request() req, @Body() updateStudentDto: UpdateStudentDto) {
    const id = req.user.sub;
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
