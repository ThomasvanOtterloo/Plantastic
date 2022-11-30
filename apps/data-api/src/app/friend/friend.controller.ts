import {Body, Controller, Delete, Get, HttpException, Param, Post} from '@nestjs/common';
import {Product, Review, User} from '@find-a-buddy/data';
import { InjectToken, Token } from '../auth/token.decorator';
import {FriendService} from "./friend.service";
import {Friend} from "./friend.schema";

@Controller('friend')
export class FriendController {
    constructor(private readonly friendService: FriendService) {}

    @Post()
    async addFriends(@InjectToken() token: Token, @Body() userId: Friend): Promise<Friend> {
        try {
            // console.log('friendId: ', userId.userId + '<> token.id: ' + token.id);
            return this.friendService.addFriend(token.id , userId.userId);
        }
        catch (e) {
            console.log('DIDNT WORK', e);
            throw new HttpException('Error creating product >' + e, 500);
        }

    }

    @Delete(':id')
    async removeFriend(@InjectToken() token: Token, @Param('id') userId: string): Promise<Friend> {
        try {
            return this.friendService.removeFriend(token.id, userId);
        }
        catch (e) {
            console.log('DIDNT WORK', e);
            throw new HttpException('Error deleting friend >' + e, 500);
        }
    }

}
