import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { ParentAuthService } from 'src/auth/parent-auth/parent-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Parent, ParentSchema } from 'src/schemas/parent.schema';
import { ParentAuthModule } from 'src/auth/parent-auth/parent-auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }]),
    ParentAuthModule,
  ],
  controllers: [ParentsController],
  providers: [ParentsService, ParentAuthService],
})
export class ParentsModule {}
