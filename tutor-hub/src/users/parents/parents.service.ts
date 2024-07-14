import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Parent } from 'src/schemas/parent.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParentAuthService } from 'src/auth/parent-auth/parent-auth.service';
import { SignInParentDto } from './dto/signin-parent.dto';
import { ParentAuth } from 'src/auth/parent-auth/dtos/parentAuth.dto';

@Injectable()
export class ParentsService {
  constructor(
    @InjectModel(Parent.name) private ParentModel: Model<Parent>,
    private authService: ParentAuthService,
  ) {}

  async createParent(createParentDto: CreateParentDto) {
    const { firstName, lastName, email, userName, password } = createParentDto;
    const hashedPassword = await this.authService.hashPassword(password);
    const createdParent = new this.ParentModel({
      firstName,
      lastName,
      email,
      userName,
      password: hashedPassword,
    });
    return createdParent.save();
  }
  async signIn(signInParentDto: SignInParentDto) {
    const { email, userName, password } = signInParentDto;
    const Parent = await this.ParentModel.findOne({
      email,
      userName,
    });
    if (!Parent) {
      throw new BadRequestException('user not found');
    }
    const match = await this.authService.comparePassword(
      password,
      Parent.password,
    );
    if (!match) {
      throw new BadRequestException('Incorrect password');
    }

    const token = this.authService.generateToken(
      new ParentAuth(Parent._id.toString(), Parent.userName, Parent.email),
    );
    return token;
  }

  findAll() {
    return `This action returns all parents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parent`;
  }

  update(id: number, updateParentDto: UpdateParentDto) {
    return `This action updates a #${id} parent`;
  }

  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
}
