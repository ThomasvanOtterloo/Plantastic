import {Injectable} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {User, UserDocument} from "../user/user.schema";
import {Friend, FriendDocument} from "./friend.schema";


@Injectable()
export class FriendService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Friend.name) private friendModel: Model<FriendDocument>
  ) {}

    async addFriend(userId: string, friendId: string): Promise<Friend | null> {
        await this.userModel.updateOne({id: userId}, {$addToSet: {friends: {id: friendId}}});
        return this.userModel.findOne({
            id: userId,
        });
    }

    async removeFriend(userId: string, friendId: string): Promise<Friend | null> {
      await this.userModel.updateOne({id: userId}, {$pull: {friends: {id: friendId}}});
      return this.userModel.findOne({
        id: userId,
      });
    }
}
