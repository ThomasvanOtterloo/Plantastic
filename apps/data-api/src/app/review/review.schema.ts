import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {

  @Prop({default: uuid, index: true})
  id: string;

  @Prop({
    required: true,
    unique: false,
  })
  productId: string;

  @Prop({
    required: true,
    unique: false,
  })
  authorId: string;

  @Prop({
    required: true,
    default: Date.now
  })
  datetime: Date;

  @Prop({
    required: true,
    unique: false,
  })
  author: string;

  @Prop({
    required: true,
    unique: false,
  })
  description: string;

  @Prop({
    required: true,
    unique: false,
    default: 0,
    validate: [rating => rating >= 0 && rating <= 10, 'Rating must be between 0 and 10'],
  })
  rating: number;



}

export const ReviewSchema = SchemaFactory.createForClass(Review);
