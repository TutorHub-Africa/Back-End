import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TutorJwtAuthGuard } from './guards/jwt-tutorAuth.guard';
import { TutorJwtStrategy } from './strategies/jwt-tutorAuth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TutorAuthService } from './tutor-auth.service';
import { TutorGoogleStrategy } from './strategies/tutorAuthGoogle.strategy';
import { TutorGoogleAuthGuard } from './guards/tutorAuthGoogle.guard';
import { TutorService } from 'src/users/tutor/tutor.service';
import { TutorModule } from 'src/users/tutor/tutor.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2 days' },
      }),
    }),
    forwardRef(() => TutorModule),
  ],
  providers: [
    TutorAuthService,
    TutorJwtAuthGuard,
    TutorJwtStrategy,
    TutorGoogleStrategy,
    TutorGoogleAuthGuard,
    TutorService,
  ],
  exports: [TutorAuthService],
})
export class TutorAuthModule {}
