import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type OrderDocument = Order & Document;

@Schema()
export class Order {

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
    unique: false,
  })
  quantity: number;

  @Prop({
    required: false,
    unique: false,
  })
  total: number;

  @Prop({
    required: true,
  })
  deliveryDate: Date;

  @Prop({
    required: false,
    unique: false,
  })
  productImage: string;

  @Prop({
    required: false,
    unique: false,
  })
  productName: string;








}

export const OrderSchema = SchemaFactory.createForClass(Order);
