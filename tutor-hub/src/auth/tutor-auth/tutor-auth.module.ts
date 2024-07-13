import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TutorJwtAuthGuard } from './guards/jwt-tutorAuth.guard';
import { TutorJwtStrategy } from './strategies/jwt-tutorAuth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TutorAuthService } from './tutor-auth.service';

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
  ],
  providers: [TutorAuthService, TutorJwtAuthGuard, TutorJwtStrategy],
  exports: [TutorAuthService],
})
export class TutorAuthModule {}
