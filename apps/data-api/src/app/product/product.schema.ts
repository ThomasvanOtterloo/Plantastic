import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import {Category, Review, User} from "@find-a-buddy/data";
// import { Meetup } from '../meetup/meetup.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({default: uuid, index: true})
  id: string;

  @Prop({
    required: true,
    unique: false,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: false,
    default: 0,
    validate: [rating => rating >= 0 && rating <= 10, 'Rating must be between 0 and 10'],
  })
  rating: number;


  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  quantity: number;

  @Prop({
    required: true,
  })
  author: string;

  @Prop({
    required: false,
    default: 'https://static.vecteezy.com/system/resources/previews/002/425/076/non_2x/plant-leaves-in-a-pot-beautiful-green-houseplant-isolated-simple-trendy-flat-style-for-interior-garden-decoration-design-free-vector.jpg'
  })
  image: string;

  @Prop({default: []})
  reviews: Review[];

  @Prop({
    default: [],
    required: true,
  })
  category: Category[];


}

export const ProductSchema = SchemaFactory.createForClass(Product);
