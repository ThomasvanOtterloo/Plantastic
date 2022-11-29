import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User as UserModel, UserDocument } from './user.schema';

import { User, UserInfo } from '@find-a-buddy/data';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    // @InjectModel(Meetup.name) private meetupModel: Model<MeetupDocument>
  ) {}

  async getAll(): Promise<UserInfo[]> {
    return this.userModel.aggregate([{
      $lookup: {
        from: 'meetups',
        localField: 'meetups',
        foreignField: '_id',
        as: 'meetups',
      }},
        {$group: {
            _id: '$_id',
            id: {$first: '$id'},
            username: {$first: '$username'},
            wallet: {$first: '$wallet'},
            products: {$push: '$products'},
            reviews: {$push: '$reviews'},
            friends: {$push: '$friends'}
          },
        }]);
  }

  async getOne(userId: string): Promise<User | null> {
    console.log('model', this.userModel);
    const users = await this.userModel.aggregate([{
      $match: {
          id: userId,
        }},
      {$group: {
          _id: '$_id',
          id: {$first: '$id'},
          username: {$first: '$username'},
          wallet: {$first: '$wallet'},
          products: {$push: '$products'},
          reviews: {$push: '$reviews'},
          friends: {$push: '$friends'},
              orders: {$push: '$orders'},
        }
      }]);
    console.log('users', users);
    return users[0];
  }

}
