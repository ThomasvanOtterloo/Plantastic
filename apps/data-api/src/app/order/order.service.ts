import {Injectable} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {User, UserDocument} from "../user/user.schema";
import {Product, ProductDocument} from "../product/product.schema";
import {Order, OrderDocument} from "./order.schema";
import {Token} from "../auth/token.decorator";


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
        },
        {
            $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: 'id',
                as: 'product',
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

  async create(order: Order, token: Token): Promise<Order> {
    const product = await this.productModel.findOne({ id: order.productId });
    const author = await this.userModel.findOne({ id: token.id});

    if (product && author) {
        const newOrder = new this.orderModel({
            authorId: token.id,
            productId: order.productId,
            quantity: order.quantity,
            total: order.quantity * product.price,
            productPrice: product.price,
            deliveryDate: new Date().setDate( new Date().getDate() + 7 ),
        });

        console.log('newOrder', newOrder.deliveryDate.toLocaleString());

        author.orders.push(newOrder);

        const updateUser = await this.userModel.findOneAndUpdate(
            { id: token.id },
            { $set: {
                orders: author.orders,
                    wallet: author.wallet - newOrder.total,
            } },
        );

        const updateProduct = await this.productModel.findOneAndUpdate(
            { id: order.productId },
            { $set: {
                quantity: product.quantity - order.quantity,
            } },
        );

        await Promise.all([updateUser, updateProduct]);
        return newOrder.save();
    }
  }

    async delete(orderId: string, token: Token): Promise<Order> {
        const order = await this.orderModel.findOne
        ({ id: orderId });

        if (order.authorId === token.id) {
            const product = await this.productModel.findOne({ id: order.productId });
            const author = await this.userModel.findOne({ id: token.id});

            if (product && author) {
                const updateUser = await this.userModel.findOneAndUpdate(
                    { id: token.id },
                    { $set: {
                        wallet: author.wallet + order.total,
                    } },
                );

                const updateProduct = await this.productModel.findOneAndUpdate(
                    { id: order.productId },
                    { $set: {
                        quantity: product.quantity + order.quantity,
                    } },
                );

                await Promise.all([updateUser, updateProduct]);
                return this.orderModel.findOneAndDelete({ id: orderId

                });
            }
        } else {
            throw new Error('You can not delete this order');
        }
    }


}
