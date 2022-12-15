import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';

import {UserService} from './user.service';

import {User, UserInfo} from '@find-a-buddy/data';
import {InjectToken, Token} from '../auth/token.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<UserInfo[]> {
    return this.userService.getAll();
  }

  // this method should precede the general getOne method, otherwise it never matches
  @Get('self')
  async getSelf(@InjectToken() token: Token): Promise<User> {
    console.log('token CurrentLogger:', token);
    return await this.userService.getOne(token.id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }




}
