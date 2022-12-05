import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type FollowDocument = Follow & Document;

@Schema()
export class Follow {

  @Prop({default: uuid, index: true})
  id: string;

  @Prop({
    required: true,
    unique: true,
  })
  userId: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;



}

export const FollowSchema = SchemaFactory.createForClass(Follow);
