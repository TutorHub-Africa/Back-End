import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { StudentsService } from 'src/users/students/students.service';

@Injectable()
export class StudentGoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private studentService: StudentsService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/tutor/google/redirect',
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/calendar.events.readonly',
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/meetings',
      ],
    });
  }

  async validate(
    access_token: string,
    refresh_token: string,
    profile: Profile,
  ) {
    // TODO
  }
}
