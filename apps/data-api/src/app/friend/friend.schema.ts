import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type FriendDocument = Friend & Document;

@Schema()
export class Friend {

  @Prop({default: uuid, index: true})
  id: string;

  @Prop({
    required: true,
    unique: true,
  })
  userId: string;



}

export const FriendSchema = SchemaFactory.createForClass(Friend);
