import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTutorDto, createTutorGoogleDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { TutorAuthService } from 'src/auth/tutor-auth/tutor-auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { feedback, Tutor } from 'src/schemas/tutor.schema';
import { Model } from 'mongoose';
import { LoginTutorDto, LoginTutorGoogleDto } from './dto/login-tutor.dto';
import { TutorAuth } from 'src/auth/tutor-auth/dtos/tutorAuth.dto';

@Injectable()
export class TutorService {
  constructor(
    @InjectModel(Tutor.name) private tutorModel: Model<Tutor>,
    private tutorAuthService: TutorAuthService,
  ) {}

  async create(createTutorDto: CreateTutorDto) {
    const tutor = await this.tutorModel.findOne({
      $or: [
        { email: createTutorDto.email },
        { userName: createTutorDto.userName },
      ],
    });

    if (tutor) {
      throw new BadRequestException('Username or email already exists');
    }

    const newTutor = new this.tutorModel(createTutorDto);
    newTutor.password = await this.tutorAuthService.hashPassword(
      createTutorDto.password,
    );

    return await newTutor.save();
  }

  async createWithGoogle(createTutorDto: createTutorGoogleDto) {
    const tutor = await this.tutorModel.findOne({
      $or: [
        { email: createTutorDto.email },
        { userName: createTutorDto.userName },
      ],
    });

    if (tutor) {
      // If there is account procceed to login
      const account = new LoginTutorGoogleDto();
      account.email = createTutorDto.email;
      account.googleId = createTutorDto.googleId;
      return await this.logInWithGoogle(account);
    }

    const newTutor = new this.tutorModel(createTutorDto);

    await newTutor.save();

    // Proceed to login
    const account = new LoginTutorGoogleDto();
    account.email = createTutorDto.email;
    account.googleId = createTutorDto.googleId;
    return await this.logInWithGoogle(account);
  }

  async findByEmail(email: string) {
    const tutorFound = await this.tutorModel.findOne({
      $or: [{ email: email }],
    });

    if (!tutorFound) {
      throw new NotFoundException('Tutor not found');
    }

    return tutorFound;
  }

  async logIn(tutor: LoginTutorDto) {
    const tutorFound = await this.findByEmail(tutor.email);

    const isPasswordValid = await this.tutorAuthService.comparePassword(
      tutor.password,
      tutorFound.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    console.log(tutorFound);

    const logTutor = new TutorAuth(
      tutorFound._id.toString(),
      tutorFound.userName,
      tutorFound.email,
    );

    return await this.tutorAuthService.generateToken(logTutor);
  }

  async logInWithGoogle(tutor: LoginTutorGoogleDto) {
    const tutorFound = await this.findByEmail(tutor.email);
    const logTutor = new TutorAuth(
      tutorFound._id.toString(),
      tutorFound.userName,
      tutorFound.email,
    );

    return await this.tutorAuthService.generateToken(logTutor);
  }

  async findAll() {
    const tutorsFound = await this.tutorModel.find();
    if (!tutorsFound) {
      throw new NotFoundException('No tutors found');
    }
    return tutorsFound;
  }

  async findOne(id: string) {
    const tutorFound = await this.tutorModel.findOne({
      $or: [{ _id: id }],
    });

    if (!tutorFound) {
      throw new NotFoundException('Tutor not found');
    }

    return tutorFound;
  }

  async AddImagePath(id: string, filename: string) {
    if (!id) {
      return 'No cinema Id provided';
    }

    const tutor = await this.findOne(id);
    tutor.imageUrl = `src/images/tutorProfiles/${filename}`;

    return await tutor.save();
  }

  async update(id: string, updateTutorDto: UpdateTutorDto) {
    const tutorFound = await this.findOne(id);
    if (!tutorFound) {
      throw new NotFoundException('Tutor not found');
    }

    return await this.tutorModel.findByIdAndUpdate(id, updateTutorDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} tutor`;
  }

  async ensureUniqueUsername(username: string): Promise<string> {
    let uniqueUsername = username;
    let count = 0;

    while (await this.tutorModel.findOne({ userName: uniqueUsername })) {
      count++;
      uniqueUsername = `${username}${count}`;
    }

    return uniqueUsername;
  }

  async addFeedback(studentId: string, tutorId: string, feedback: feedback) {
    const tutorFound = await this.findOne(tutorId);
    if (!tutorFound) {
      throw new NotFoundException('Tutor not found');
    }

    tutorFound.feedback = [...tutorFound.feedback, feedback];
    return await tutorFound.save();
  }
}
