import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SocialMedia extends Document {
  @Prop({ required: false })
  twitter?: string;

  @Prop({ required: false })
  linkedin?: string;

  @Prop({ required: false })
  telegram?: string;

  @Prop({ required: false })
  facebook?: string;

  @Prop({ required: false })
  instagram?: string;
}

export const SocialMediaSchema = SchemaFactory.createForClass(SocialMedia);
