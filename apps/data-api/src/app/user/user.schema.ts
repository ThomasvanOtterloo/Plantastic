import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import {Product, Review} from "@find-a-buddy/data";

// import { Meetup } from '../meetup/meetup.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({default: uuid, index: true})
  id: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    default: 500,
    unique: false,
  })
  wallet: number;

  @Prop({default: []})
  friends: User[];

  @Prop({default: []})
  products: Product[];

  @Prop({default: []})
  reviews: Review[];

}

export const UserSchema = SchemaFactory.createForClass(User);
