import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TutorAuth } from './dtos/tutorAuth.dto';

@Injectable()
export class TutorAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateToken(tutor: TutorAuth) {
    const token = await this.jwtService.signAsync(
      {
        sub: tutor.id,
        userName: tutor.userName,
        email: tutor.email,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '2 days',
      },
    );

    return { tutorToken: token };
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(password: string, storedPassword: string) {
    return await bcrypt.compare(password, storedPassword);
  }
}
