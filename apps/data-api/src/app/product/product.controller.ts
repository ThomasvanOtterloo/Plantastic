
import {Body, Controller, Delete, Get, HttpException,HttpStatus ,Param, Patch, Post, Put} from '@nestjs/common';


import { Product, User } from '@find-a-buddy/data';
import { InjectToken, Token } from '../auth/token.decorator';
import {ProductService} from "./product.service";
import {HttpResponse} from "@angular/common/http";

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
        if (product.image === '') {
            product.image = 'https://static.vecteezy.com/system/resources/previews/002/425/076/non_2x/plant-leaves-in-a-pot-beautiful-green-houseplant-isolated-simple-trendy-flat-style-for-interior-garden-decoration-design-free-vector.jpg'
        }
        try {
            return await this.productService.create(product, token);
        }
        catch (e) {
            console.log('error', e);
            throw new HttpException('Error creating product >' + e, 500);
        }
    }

    @Delete(':id')
    async delete(@InjectToken() token: Token, @Param('id') id: string): Promise<Product> {
        await this.productService.delete(id, token);
        return null;
    }

    @Patch(':id')
    async update(@InjectToken() token: Token, @Param('id') id: string, @Body() product: Product): Promise<Product> {
        try {
            return await this.productService.update(id, product, token);
        }
        catch (e) {
            console.log('error', e);
            throw new HttpException('Error updating product >' + e, HttpStatus.BAD_REQUEST);
        }
    }


}
