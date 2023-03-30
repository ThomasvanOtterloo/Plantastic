import { Module } from '@nestjs/common';
import {MongooseModule, Schema} from '@nestjs/mongoose';

// import { TopicController } from './topic/topic.controller';
// import { MeetupService } from './meetup/meetup.service';
// import { TopicService } from './topic/topic.service';
import { ProductService} from "./product/product.service";
import { UserService } from './user/user.service';

import { User, UserSchema } from './user/user.schema';
// import { Topic, TopicSchema } from './topic/topic.schema';
// import { Meetup, MeetupSchema } from './meetup/meetup.schema';
import { Product, ProductSchema } from './product/product.schema';
import { UserController } from './user/user.controller';
import { ProductController } from './product/product.controller';
import {Review, ReviewSchema} from "./review/review.schema";
import {ReviewController} from "./review/review.controller";
import {ReviewService} from "./review/review.service";
import {OrderController} from "./order/order.controller";
import {OrderService} from "./order/order.service";
import {Order, OrderSchema} from "./order/order.schema";
import {Follow, FollowSchema} from "./friend/follow.schema";
import {FollowService} from "./friend/follow.service";
import {FollowController} from "./friend/follow.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Order.name, schema:  OrderSchema },
      { name: Follow.name, schema: FollowSchema}
    ]),
  ],
  controllers: [
    UserController,
    ProductController,
    ReviewController,
    OrderController,
    FollowController
  ],
  providers: [
    UserService,
    ProductService,
    ReviewService,
    OrderService,
    FollowService
  ],
})
export class DataModule {}
