import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TutorService } from 'src/users/tutor/tutor.service';
import { createTutorGoogleDto } from 'src/users/tutor/dto/create-tutor.dto';

@Injectable()
export class TutorGoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private tutorService: TutorService,
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
    const uniqueUsername = await this.tutorService.ensureUniqueUsername(
      profile['name'].givenName,
    );

    console.log('uniqueUsername', uniqueUsername);
    const tutorDto = new createTutorGoogleDto();
    tutorDto.firstName = profile['name'].givenName;
    tutorDto.lastName = profile['name'].familyName;
    tutorDto.userName = uniqueUsername;
    tutorDto.email = profile.emails[0].value;
    tutorDto.googleId = profile.id;

    const tutor = await this.tutorService.createWithGoogle(tutorDto);
    return tutor;
  }
}
