
import {Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Put} from '@nestjs/common';


import {Product, Review, User} from '@find-a-buddy/data';
import { InjectToken, Token } from '../auth/token.decorator';
import {ReviewService} from "./review.service";

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Get()
    async getAll(): Promise<Review[]> {
        return this.reviewService.getAll();
    }



    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Review> {
        return this.reviewService.getOne(id);
    }


    @Post(':id')
    async create(@InjectToken() token: Token, @Param('id') productId: string ,  @Body() review: Review): Promise<Review> {
        try {

            console.log('productid:>>>' , productId)
            return await this.reviewService.create(review , token, productId);
        }
        catch (e) {
            console.log('error', e);
            throw new HttpException('Error creating product >' + e, 500);
        }
    }

    @Delete(':id')
    async delete(@InjectToken() token: Token, @Param('id') id: string): Promise<void> {
        return this.reviewService.delete(token , id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() review: Review): Promise<Review> {
        console.log('adasdasd',review);
        return this.reviewService.update(id, review);
    }



}