import {Injectable} from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {Product as ProductModel, ProductDocument} from './product.schema';
import {Category, Id, Product, Review} from '@find-a-buddy/data';
import {User, UserDocument} from "../user/user.schema";
import {Token} from "../auth/token.decorator";
import {Neo4jService} from "../neo4j/neo4j.service";


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly neo4jService: Neo4jService
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
                quantity: {$first: '$quantity'},
                price: {$first: '$price'},
                reviews: {$first: '$reviews'},
                category: {$first: '$category'},
            },
        },
        {
            $addFields: {
                rating: {
                    rating: {$avg: '$reviews.rating'},
                }
            }
        }
    ]);
  }

  async delete(productId: string, token: Token){
      console.log('productId', productId);
      const product = await this.productModel.findOne({ id: productId });
        if (!product) {
            throw new Error('Product not found');
        }

      if (product.authorId !== token.id) {
            throw new Error('You are not allowed to delete this product');
      }
    await this.productModel.deleteOne({ id: productId });

      const deleteProductNeo4j = await this.neo4jService.singleWrite(
            `MATCH (p:Product {id: $id}) DETACH DELETE p`,
            {
                id: productId,
            }
        );

    await this.userModel.updateMany(
        {},
        {
            $pull: {
                products: {
                    id: productId,
                },
            },
        },
        { multi: true }
    );
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
                authorId: {$first: '$authorId'},
                name: {$first: '$name'},
                description: {$first: '$description'},
                image: {$first: '$image'},
                quantity: {$first: '$quantity'},
                price: {$first: '$price'},
                reviews: {$first: '$reviews'},
                category: {$first: '$category'},
            }
        },
        {
            $addFields: {
                rating: {
                    rating: {$avg: '$reviews.rating'},
                }
            }
        }
    ]);
    return products[0];
  }

  async create(product: Product, token: Token): Promise<Product> {
      console.log(product)
    const author = await this.userModel.findOne({ username: token.username });
    if (!author) {
        throw new Error('AuthorId not found');
    }

      if (product.price <1) {
          throw new Error('Price must be greater than 1');
      }
      if (product.quantity <2) {
          throw new Error('Quantity must be greater than 2');
      }
      if (product.category.length <1) {
          throw new Error('Category must be greater than 1');
      }
      if (product.name.length <1) {
          throw new Error('Name must be greater than 1');
      }
      if (product.description.length <1) {
          throw new Error('Description must be greater than 1');
      }

    const newProduct = new this.productModel({
        author: author.username,
        authorId: author.id,
        name: product.name,
        description: product.description,
        image: product.image,
        quantity: product.quantity,
        price: product.price,
        category: product.category,
    });

    const addProductToUser = await this.userModel.findOneAndUpdate(
        { username: token.username },
        {
            $push: {
                products: {
                    id: newProduct.id,
                    name: newProduct.name,
                    description: newProduct.description,
                    image: newProduct.image,
                    quantity: newProduct.quantity,
                    price: newProduct.price,
                    category: newProduct.category,
                },
            },
        },
        { new: true }
    );

      const AddProductWithUser = await this.neo4jService.singleWrite(
           'MATCH (u:User {id: $userId}) CREATE (p:Product {id: $productId, name: $productName, description: $productDescription, image: $productImage, quantity: $productQuantity, price: $productPrice, category: $productCategory}) CREATE (u)-[:SOLD_BY]->(p)',
            {
                userId: author.id,
                productId: newProduct.id,
                productName: newProduct.name,
                productDescription: newProduct.description,
                productImage: newProduct.image,
                productQuantity: newProduct.quantity,
                productPrice: newProduct.price,
                productCategory: newProduct.category,
            }
        );

      console.log('createProductNeo4j', AddProductWithUser);

    await Promise.all([newProduct.save(), addProductToUser.save()]);

    return newProduct;
  }

    async update(productId: string , product: Product, token: Token): Promise<Product> {
        if (product.authorId !== token.id) {
            throw new Error('You are not allowed to update this product');
        }
        if (product.price <1) {
            throw new Error('Price must be greater than 1');
        }
        if (product.quantity <2) {
            throw new Error('Quantity must be greater than 2');
        }
        if (product.category.length <1) {
            throw new Error('Category must be greater than 1');
        }
        if (product.name.length <1) {
            throw new Error('Name must be greater than 1 character');
        }

        const updatedProduct = await this.productModel.findOneAndUpdate(
            { id: productId },
            {
                ...product,
            },
            { new: true }
        );

        const updateProductNeo4j = await this.neo4jService.singleWrite(
            `MATCH (p:Product {id: $id}) SET p.name = $name, p.description = $description, p.image = $image, p.quantity = $quantity, p.price = $price, p.category = $category`,
            {
                id: productId,
                name: product.name,
                description: product.description,
                image: product.image,
                quantity: product.quantity,
                price: product.price,
                category: product.category,
            }
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
