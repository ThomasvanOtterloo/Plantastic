import {Injectable} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {User, UserDocument} from "../user/user.schema";
import {Product, ProductDocument} from "../product/product.schema";
import {Order, OrderDocument} from "./order.schema";


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  async getAll(token : string): Promise<Order[]> {
    return this.orderModel.aggregate([{
        $match: {
            authorId: token,
      }},
        {
            $group: {
                _id: '$_id',
                id: {$first: '$id'},
                productId: {$first: '$productId'},
                authorId: {$first: '$authorId'},
                quantity: {$first: '$quantity'},
                total: {$first: '$total'},
                deliveryDate: {$first: '$deliveryDate'},
            }
        }
    ]);
  }

  async getOne(orderId: string): Promise<Order | null> {
    const products = await this.orderModel.aggregate([{
        $match: {
            orderId: orderId,
        }},
        {
            $group: {
                _id: '$_id',
                id: {$first: '$id'},
                productId: {$first: '$productId'},
                authorId: {$first: '$authorId'},
                quantity: {$first: '$quantity'},
                total: {$first: '$total'},
                deliveryDate: {$first: '$deliveryDate'},
            }
        }
    ]);
    return products[0];
  }

  async create(order: Order, authorId: string): Promise<Order> {
    const product = await this.productModel.findOne({ id: order.productId });
    const author = await this.userModel.findOne({ id: authorId});

    if (!author) {
        console.log(author)
        throw new Error('authorId not found');
    }

      if (!product) {
          console.log("product: " + product)
          throw new Error('productId not found');
      }


    const newOrder = new this.orderModel({
        productId: order.productId,
        authorId: authorId,
        quantity: order.quantity,
        total: product.price * order.quantity,
        deliverDate: new Date(),
    });

      author.orders.push(newOrder.id);

    await Promise.all([author.save(), product.save(), newOrder.save()]);

    return newOrder;
  }
}
