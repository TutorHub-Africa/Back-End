/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { diskStorage } from 'multer';
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { LoginTutorDto } from './dto/login-tutor.dto';
import { TutorJwtAuthGuard } from 'src/auth/tutor-auth/guards/jwt-tutorAuth.guard';
import { v4 as uuidv4 } from 'uuid';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post('/create-Account')
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorService.create(createTutorDto);
  }

  @Post('/login')
  logIn(@Body() loginTutorDto: LoginTutorDto) {
    return this.tutorService.logIn(loginTutorDto);
  }

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/images/tutorProfiles',
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
  @UseGuards(TutorJwtAuthGuard)
  async uploadImage(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.tutorService.AddImagePath(req.user.sub, file.filename);
  }

  @Get()
  findAll() {
    return this.tutorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorService.findOne(id);
  }

  @Patch('/update-profile')
  @UseGuards(TutorJwtAuthGuard)
  update(@Request() req, @Body() updateTutorDto: UpdateTutorDto) {
    const id = req.user.sub;
    return this.tutorService.update(id, updateTutorDto);
  }

  @Patch('/update-bio')
  @UseGuards(TutorJwtAuthGuard)
  updateBio(@Request() req, @Body() bio: UpdateTutorDto) {
    const id = req.user.sub;
    return this.tutorService.update(id, bio);
  }

  @Patch('/update-skills')
  @UseGuards(TutorJwtAuthGuard)
  updateSkills(@Request() req, @Body() skills: UpdateTutorDto) {
    const id = req.user.sub;
    return this.tutorService.update(id, skills);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorService.remove(+id);
  }
}
