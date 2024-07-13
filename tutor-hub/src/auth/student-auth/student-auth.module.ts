import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { StudentJwtAuthGuard } from './guards/jwt-studentAuth.guard';
import { StudentJwtStrategy } from './strategies/jwt-studentAuth.strategy';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentAuthService } from './student-auth.service';

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
  providers: [StudentAuthService, StudentJwtAuthGuard, StudentJwtStrategy],
  exports: [StudentAuthService],
})
export class StudentAuthModule {}
