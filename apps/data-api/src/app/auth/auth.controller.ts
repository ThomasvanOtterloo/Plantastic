import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

import { ResourceId, Token, UserRegistration } from '@find-a-buddy/data';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() credentials: UserRegistration): Promise<ResourceId> {
        console.log('register', credentials);
        try {
            await this.authService.registerUser(credentials.username, credentials.password);
            console.log('register succeeded');
            return {
                id: await this.authService.createUser(credentials.username),
            };
        } catch (e) {
            throw new HttpException('Username invalid' + e, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() credentials: UserRegistration): Promise<Token> {
        console.log('login inside controller', credentials);
        try {
            return {

                token: await this.authService.generateToken(credentials.username, credentials.password)
            };
        } catch (e) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
