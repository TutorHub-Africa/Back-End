import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentAuthModule } from './auth/student-auth/student-auth.module';
import { ParentAuthModule } from './auth/parent-auth/parent-auth.module';
import { TutorAuthModule } from './auth/tutor-auth/tutor-auth.module';

@Module({
  imports: [StudentAuthModule, ParentAuthModule, TutorAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
