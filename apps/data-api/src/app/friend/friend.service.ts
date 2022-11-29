import {Injectable} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {User, UserDocument} from "../user/user.schema";
import {Product, ProductDocument} from "../product/product.schema";
import {Friend, FriendDocument} from "./friend.schema";


@Injectable()
export class FriendService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Friend.name) private friendModel: Model<FriendDocument>
  ) {}

    async addFriend(userId: string, friendId: string): Promise<Friend | null> {
        const user = await this.userModel.findOne({id: userId});
        const friend = await this.userModel.findOne({id: friendId});

        console.log('current user: ',userId);
        console.log('friend id: ',friendId);
        if (!user) {
            throw new Error('User not found');
        }
        if (!friend) {
            throw new Error('Friend not found');
        }
        if (user.friends.includes(friend)) {
            throw new Error('Friend already added');
        }

        const newFriend = new this.friendModel(
            {
                userId: friendId,
            }
        );

        user.friends.push(friend);
        await Promise.all([user.save()]);

        return newFriend;
    }


    async removeFriend(userId: string, friendId: string): Promise<Friend | null> {


        return null;
    }



}
