import {Injectable, NotFoundException} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import { ReviewDocument, Review as ReviewModel} from './review.schema';
import {Category, Id, Review} from '@find-a-buddy/data';
import {User, UserDocument} from "../user/user.schema";
import {Product, ProductDocument} from "../product/product.schema";
import {Token} from "../auth/token.decorator";


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

  async delete(token: Token , id: string){

      const findUserWithReview = await this.userModel.findOne
        ({id: token.id, reviews: {$elemMatch: {id: id}}});
        if (!findUserWithReview) {
            throw new Error(`Review with id ${id} not found`);
        }


      await Promise.all([
          this.userModel.updateMany({username: token.username}, { $pull: { reviews: { id: id } } }),
          this.productModel.updateMany({}, { $pull: { reviews: { id: id } } }),
          this.reviewModel.deleteOne({id: id }),
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

  async create(review: Review, author: Token, productId: string): Promise<User> {
    console.log(review);
      review.authorId = author.id;
      review.author = author.username;
      review.productId = productId;

      if (review.rating > 10 || review.rating < 0 || review.rating % 1 !== 0) {
            throw new NotFoundException(`Rating must be between 0 and 10`);
      }
      if (review.description === '') {
            throw new NotFoundException(`Description must not be empty`);
      }

        const newReview = new this.reviewModel({
            ...review,
        });
    const createdReview = await this.userModel.findOneAndUpdate({ id: author.id }, { $push: { reviews: newReview } });
    const createdReview2 = await this.productModel.findOneAndUpdate({ id: productId }, { $push: { reviews: newReview } });

    await Promise.all([createdReview, createdReview2, newReview]);

    return createdReview
  }

    async update(id: string, review: Review): Promise<Review> {

      const updatedReview = await this.reviewModel.findOneAndUpdate({
            id: id,
        }, {
            ...review,
        }, {
            new: true,
        });

      const updatedReview2 = await this.userModel.findOneAndUpdate({
            id: review.authorId,
        }, {
            $set: {
                'reviews.$[elem].description': review.description,
                'reviews.$[elem].rating': review.rating,
            }
        }, {
            arrayFilters: [{
                'elem.id': id,
            }],
            new: true,
        });

         const updatedReview3 = await this.productModel.findOneAndUpdate({
            id: review.productId,
        }, {
            $set: {
                'reviews.$[elem].description': review.description,
                'reviews.$[elem].rating': review.rating,
            }
        }, {
            arrayFilters: [{
                'elem.id': id,
            }],
            new: true,
        });

        await Promise.all([updatedReview, updatedReview2, updatedReview3]);

        return updatedReview;
    }

    formatReviewDate(date: Date) {
        return date.toLocaleString('en-us',{month:'short', year:'numeric', day:'numeric'})
    }
}
