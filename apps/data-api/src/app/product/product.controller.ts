
import {Body, Controller, Get, HttpException, Param, Post} from '@nestjs/common';


import { Product, User } from '@find-a-buddy/data';
import { InjectToken, Token } from '../auth/token.decorator';
import {ProductService} from "./product.service";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAll(): Promise<Product[]> {
        return this.productService.getAll();
    }



    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Product> {
        return this.productService.getOne(id);
    }


    @Post()
    async create(@InjectToken() token: Token,  @Body() product: Product): Promise<Product> {
        try {
            return await this.productService.create(product, token.id);
        }
        catch (e) {
            console.log('error', e);
            throw new HttpException('Error creating product >' + e, 500);
        }
    }



}
