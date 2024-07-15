import { forwardRef, Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tutor, TutorSchema } from 'src/schemas/tutor.schema';
import { TutorAuthModule } from 'src/auth/tutor-auth/tutor-auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tutor.name, schema: TutorSchema }]),
    forwardRef(() => TutorAuthModule),
  ],
  controllers: [TutorController],
  providers: [TutorService],
  exports: [
    MongooseModule.forFeature([{ name: Tutor.name, schema: TutorSchema }]),
  ],
})
export class TutorModule {}
