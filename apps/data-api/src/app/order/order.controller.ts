
import {Body, Controller, Get, HttpException, HttpStatus, Param,Delete , Post} from '@nestjs/common';


import {Product, Review, User} from '@find-a-buddy/data';
import { InjectToken, Token } from '../auth/token.decorator';
import {OrderService} from "./order.service";
import {Order} from "./order.schema";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('self')
    async getAll(@InjectToken() token: Token,): Promise<Order[]> {
        return await this.orderService.getAll(token.id);
    }


    @Post()
    async create(@InjectToken() token: Token,  @Body() order: Order): Promise<Order> {
        try {
            return await this.orderService.create(order , token );
        }
        catch (e) {
            console.log('error', e);
            throw new HttpException('Error creating product >' + e, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@InjectToken() token: Token,  @Param('id') orderId: string): Promise<Order> {
        try {
            return await this.orderService.delete(orderId, token);
        }
        catch (e) {
            console.log('error', e);
            throw new HttpException('Error creating product >' + e, HttpStatus.BAD_REQUEST);
        }
    }



}
