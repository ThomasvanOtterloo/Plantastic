import {Injectable} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {User, UserDocument} from "../user/user.schema";
import {Follow, FollowDocument} from "./follow.schema";


@Injectable()
export class FollowService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>
  ) {}

    async Follow(tokenId: string, username: string): Promise<Follow[]> {
      const findFollowingUser = await this.userModel.aggregate(
        [
            {
                $match: {
                    username: username,
                }
            },
            {
                $group: {
                    _id: '$_id',
                    id: {$first: '$id'},
                    username: {$first: '$username'},
                    // products: {$first: '$products'},
                }
            }
        ]);

      await Promise.all([
            await this.userModel.updateOne(
                {id: tokenId},
                {$push: {following: findFollowingUser}},
            )]);

        return this.userModel.aggregate([
            {
                $match: {
                    id: tokenId,
                }
            },
            {
                $group: {
                    _id: '$_id',
                    id: {$first: '$id'},
                    username: {$first: '$username'},
                    following: {$first: '$following'},
                }
            }]);
      }


    async Unfollow(userId: string, followingUsername: string): Promise<Follow> {
        const findFollowingUser = await this.userModel.aggregate(
            [
                {
                    $match: {
                        username: followingUsername,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: {$first: '$id'},
                        username: {$first: '$username'},
                        // products: {$first: '$products'},
                    }
                }
            ]);

        await Promise.all([
            await this.userModel.updateOne(
                {id: userId},
                {$pull: {following: findFollowingUser}},
            )]);

        return await this.userModel.aggregate([
            {
                $match: {
                    id: userId,
                }
            },
            {
                $group: {
                    _id: '$_id',
                    id: {$first: '$id'},
                    username: {$first: '$username'},
                    following: {$first: '$following'},
                }
            }]);
    }


    async GetAllFollowers(userId: string): Promise<Follow[]> {

        return this.userModel.aggregate([
            {
                $match: {
                    id: userId,
                }
            },
            {
                $group: {
                    _id: '$_id',
                    id: {$first: '$id'},
                    username: {$first: '$username'},
                    following: {$first: '$following'},
                }
            }]);

    }
}
