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
                rating: {$avg: '$reviews.rating'},
                quantity: {$first: '$quantity'},
                price: {$first: '$price'},
                reviews: {$first: '$reviews'},
                category: {$first: '$category'},
            }
        }

    ]);
  }

  async delete(productId: string) {
      console.log('productId', productId);
    await this.productModel.deleteOne({ id: productId });
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

    console.log('author works', author);

    const newProduct = new this.productModel({
        id: product.id,
        author: author.username,
        name: product.name,
        description: product.description,
        image: product.image,
        quantity: product.quantity,
        price: product.price,
        reviews: product.reviews,
        category: product.category
    });

    author.products.push(newProduct);

    await Promise.all([newProduct.save(), author.save()]);

    return newProduct;
  }

    async update(productId: string , product: Product): Promise<Product> {
        const updatedProduct = await this.productModel.findOneAndUpdate(
            { id: productId },
            {
                ...product,
            },
            { new: true }
        );

        const updatedAuthor = await this.userModel.findOneAndUpdate(
            { username: updatedProduct.author },
            {
                $set: {
                    'products.$[elem].name': updatedProduct.name,
                    'products.$[elem].description': updatedProduct.description,
                    'products.$[elem].image': updatedProduct.image,
                    'products.$[elem].quantity': updatedProduct.quantity,
                    'products.$[elem].price': updatedProduct.price,
                    'products.$[elem].category': updatedProduct.category,
                }
            },
            {
                arrayFilters: [
                    { 'elem.id': productId }
                ],
                new: true
            });
    return updatedProduct;
    }




}
