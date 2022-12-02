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

  async delete(id: string){
      console.log(id)
      await this.reviewModel.deleteOne({ id: id });
      await this.userModel.updateMany({}, { $pull: { reviews: { id: id } } });
      await this.productModel.updateMany({}, { $pull: { reviews: { id: id } } });

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

  async create(review: Review, author: Token, productId: string): Promise<Review> {
    console.log(review);
      review.authorId = author.id;
      review.author = author.username;
      review.productId = productId;
        const newReview = new this.reviewModel({
            ...review,
        });

    const createdReview = await this.userModel.findOneAndUpdate({ id: author.id }, { $push: { reviews: newReview } });
    const createdReview2 = await this.productModel.findOneAndUpdate({ id: productId }, { $push: { reviews: newReview } });

    await Promise.all([createdReview.save(), createdReview2.save(), newReview.save()]);

    return this.reviewModel.findOne({ id: review.id });
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

        await Promise.all([updatedReview.save(), updatedReview2.save(), updatedReview3.save()]);

        if (!updatedReview) {
            throw new NotFoundException(`Review with id ${id} not found`);
        }

        return updatedReview;
    }
}
