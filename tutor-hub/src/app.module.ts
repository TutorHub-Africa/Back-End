import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ParentsModule } from './parents/parents.module';
@Module({
  imports: [
    StudentsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tutor_hub'),
    AuthModule,
    ParentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
