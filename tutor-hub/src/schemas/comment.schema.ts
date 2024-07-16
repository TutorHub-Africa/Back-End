// comment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  studentName: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rating: number; // Assume rating is between 1 and 5
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
