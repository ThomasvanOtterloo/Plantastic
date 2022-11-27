import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
// import { MeetupController } from './meetup/meetup.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      // { name: Topic.name, schema: TopicSchema },
      // { name: Meetup.name, schema: MeetupSchema }
    ]),
  ],
  controllers: [
    // MeetupController,
    // TopicController,
    UserController,
    ProductController

  ],
  providers: [
    UserService,
    ProductService,
    // TopicService,
    // MeetupService,
  ],
})
export class DataModule {}
