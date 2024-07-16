import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { EnrolledStudent } from './enrolledStudent.schema';
import { Comment } from './comment.schema';

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  tutorId: string;

  @Prop({ required: true })
  tutorName: string;

  @Prop({ type: [EnrolledStudent], default: [] })
  enrolledStudents: EnrolledStudent[];

  @Prop({ required: true })
  grade: number;

  @Prop({ required: true })
  fee: number;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: false })
  durationPerDay: number;

  @Prop({ required: true })
  evaluation: boolean;

  @Prop({ required: true })
  seatsRemaining: number;

  // @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  // resource: {
  //   video?: string;
  //   book?: string;
  // };

  @Prop({
    type: {
      video: [
        {
          title: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
      book: [
        {
          title: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
    },
    default: {},
  })
  resources: {
    video?: { title: string; url: string }[];
    book?: { title: string; url: string }[];
  };

  @Prop({ type: [Comment], default: [] })
  comments: Comment[];

  @Prop({ required: false, default: 0 })
  rate: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.pre<Course>('save', function (next) {
  if (this.comments.length > 0) {
    const totalRating = this.comments.reduce(
      (sum, comment) => sum + comment.rating,
      0,
    );
    this.rate = totalRating / this.comments.length;
  } else {
    this.rate = 0;
  }
  next();
});
