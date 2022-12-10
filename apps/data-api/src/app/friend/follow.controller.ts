import {Body, Controller, Delete, Get, HttpException, Param, Post} from '@nestjs/common';
import {InjectToken, Token} from '../auth/token.decorator';
import {FollowService} from "./follow.service";
import {Follow} from "./follow.schema";
import {User} from "@find-a-buddy/data";

@Controller('follow')
export class FollowController {
    constructor(private readonly followService: FollowService) {}
    
    @Get()
    async CheckIfFollowed(@InjectToken() token: Token): Promise<Follow[]> {
        try {
            return this.followService.GetAllFollowers(token.id);
        }
        catch (e) {
            console.log('DIDNT WORK', e);
            throw new HttpException('Error deleting followed user >' + e, 500);
        }
    }

    @Post()
    async Follow(@InjectToken() token: Token, @Body() followingUser: Follow): Promise<Follow[]> {
        try {
            console.log('FOLLOWING USER', followingUser);
            console.log('TOKEN ID', token);
            return this.followService.Follow(token.id , followingUser.username);
        }
        catch (e) {
            console.log('DIDNT WORK', e);
            throw new HttpException('Error creating product >' + e, 500);
        }
    }



    @Delete(':id')
    async Unfollow(@InjectToken() token: Token, @Param('id') username: string): Promise<Follow[]> {
        try {
            return this.followService.Unfollow(token.id, username);
        }
        catch (e) {
            console.log('DIDNT WORK', e);
            throw new HttpException('Error deleting followed user >' + e, 500);
        }
    }

    @Get('interests')
    async getFollowersInterests(@InjectToken() token: Token): Promise<Follow[]> {
        try {
            return this.followService.getFollowersInterests(token.id);
        }
        catch (e) {
            console.log('DIDNT WORK', e);
            throw new HttpException('Error deleting followed user >' + e, 500);
        }
    }

}
