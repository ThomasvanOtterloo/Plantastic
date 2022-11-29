import {Injectable} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import { ReviewDocument, Review as ReviewModel} from './review.schema';
import {Category, Id, Review} from '@find-a-buddy/data';
import {User, UserDocument} from "../user/user.schema";
import {Product, ProductDocument} from "../product/product.schema";


@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async getAll(): Promise<Review[]> {
    return this.reviewModel.aggregate([
        {
            $lookup: {
                from: 'reviews',
                localField: 'reviews',
                foreignField: 'id',
                as: 'reviews',
            }
        },
        {
            $group: {
                _id: '$_id',
                id: {$first: '$id'},
                productId: {$first: '$productId'},
                author: {$first: '$author'},
                description: {$first: '$description'},
                rating: {$first: '$rating'},
            }
        }





    ]);
  }



  async getOne(productId: string): Promise<Review | null> {
    const products = await this.reviewModel.aggregate([
        {
            $match: {
                id: productId,
            }
        },
        {
            $group: {
                _id: '$_id',
                id: {$first: '$id'},
                productId: {$first: '$productId'},
                author: {$first: '$author'},
                description: {$first: '$description'},
                rating: {$first: '$rating'},
            }
        }

    ]);

    return products[0];
  }

  async create(review: Review, authorId: string, productId: string): Promise<Review> {
      console.log(productId)
    const product = await this.productModel.findOne({ id: productId });
    const author = await this.userModel.findOne({ id: authorId});
    if (!author) {
        console.log(author)
        throw new Error('authorId not found');
    }
      if (!product) {
          console.log("product: " + product)
          throw new Error('productId not found');
      }

      console.log("product: " + product)
      console.log("author: " + author)

    const newReview = new this.reviewModel({
        productId: productId,
        authorId: authorId,
        author: author.username,
        description: review.description,
        rating: review.rating,
    });
      console.log("newReview: " + newReview)

    author.reviews.push(newReview);
    product.reviews.push(newReview);

    await Promise.all([newReview.save(), author.save(), product.save()]);

    return newReview;
  }
}
