import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { StudentJwtAuthGuard } from './guards/jwt-studentAuth.guard';
import { StudentJwtStrategy } from './strategies/jwt-studentAuth.strategy';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentAuthService } from './student-auth.service';
import { StudentsService } from 'src/users/students/students.service';
import { StudentGoogleAuthGuard } from './guards/studentAuthGoogle.guard';
import { StudentGoogleStrategy } from './strategies/studentAuthGoogle.strategy';
import { StudentsModule } from 'src/users/students/students.module';

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
    forwardRef(() => StudentsModule),
  ],
  providers: [
    StudentAuthService,
    StudentJwtAuthGuard,
    StudentJwtStrategy,
    StudentsService,
    StudentGoogleAuthGuard,
    StudentGoogleStrategy,
  ],
  exports: [StudentAuthService],
})
export class StudentAuthModule {}
