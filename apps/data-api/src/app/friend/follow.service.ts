import {Injectable} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {User, UserDocument} from "../user/user.schema";
import {Follow, FollowDocument} from "./follow.schema";
import {Neo4jService} from "../neo4j/neo4j.service";


@Injectable()
export class FollowService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
    private readonly neo4jService: Neo4jService
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

      const findFollowingId = await this.userModel.findOne({
        username: username
      });

      const followUser = await this.neo4jService.singleWrite(
        'MATCH (u:User {id: $id}), (f:User {id: $followingId}) MERGE (u)-[r:FOLLOWS]->(f) RETURN u, r, f',
        {id: tokenId, followingId: findFollowingId.id}
        );

      console.log('follwing user neo: ',followUser);

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


    async Unfollow(userId: string, followingUsername: string): Promise<Follow[]> {
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
        const getFollowingUser = await this.userModel.findOne({username: followingUsername});

        await Promise.all([
            await this.userModel.updateOne(
                {id: userId},
                {$pull: {following: findFollowingUser}},
            )]);

        const unfollowUser = await this.neo4jService.singleWrite(
            'MATCH (u:User {id: $id})-[r:FOLLOWS]->(f:User {id: $followingId}) DELETE r',
            {id: userId, followingId: getFollowingUser.id}
        );

        console.log('unfollow user neo: ',unfollowUser);

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
            }
            ]);
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

    async getFollowersInterests(userId: string): Promise<Follow[]> {


      const getListOfFollowersInterests = await this.neo4jService.singleRead(
        'MATCH (u:User {id: $id})-[r:FOLLOWS]->(f:User)-[:SOLD_BY|:ORDERED]->(p:Product) RETURN DISTINCT p',
        {id: userId}
        );



        const getResultOfInterests = getListOfFollowersInterests.records.map((record) => {
            return record.get('p').properties;
        });


      console.log('getListOfFollowersOrders: ', getResultOfInterests);



    return getResultOfInterests;
    }




}
