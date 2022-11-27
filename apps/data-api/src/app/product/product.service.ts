import {Injectable} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {Product as ProductModel, ProductDocument} from './product.schema';
import {Category, Id, Product, Review} from '@find-a-buddy/data';
import {User, UserDocument} from "../user/user.schema";


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'products',
                foreignField: 'id',
                as: 'products',
            }

        },
        {
            $group: {
                _id: '$_id',
                id: {$first: '$id'},
                author: {$first: '$author'},
                name: {$first: '$name'},
                description: {$first: '$description'},
                image: {$first: '$image'},
                rating: {$first: '$rating'},
                quantity: {$first: '$quantity'},
                price: {$first: '$price'},
                reviews: {$first: '$reviews'},
                category: {$first: '$category'},
            }
        }





    ]);
  }



  async getOne(productId: string): Promise<Product | null> {
    const products = await this.productModel.aggregate([
        {
            $match: {
                id: productId,
            }
        },
        {
            $group: {
                _id: '$_id',
                id: {$first: '$id'},
                author: {$first: '$author'},
                name: {$first: '$name'},
                description: {$first: '$description'},
                image: {$first: '$image'},
                rating: {$first: '$rating'},
                quantity: {$first: '$quantity'},
                price: {$first: '$price'},
                reviews: {$first: '$reviews'},
                category: {$first: '$category'},



            }
        }

    ]);

    return products[0];
  }

  async create(product: Product, authorId: string): Promise<Product> {
    const author = await this.userModel.findOne({ id: authorId });
    if (!author) {
        throw new Error('AuthorId not found');
    }


    const newProduct = new this.productModel({
        author: author.id,
        name: product.name,
        description: product.description,
        image: product.image,
        rating: product.rating,
        quantity: product.quantity,
        price: product.price,
        reviews: product.reviews,
        category: product.category
    });

    author.products.push(newProduct);

    await Promise.all([newProduct.save(), author.save()]);

    return newProduct;
  }
}
