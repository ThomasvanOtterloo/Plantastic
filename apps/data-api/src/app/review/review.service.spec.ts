import {Test} from '@nestjs/testing';

import {MongooseModule} from '@nestjs/mongoose';
import {sign} from 'jsonwebtoken';
import {hashSync} from 'bcrypt';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {disconnect, Model} from 'mongoose';
import {MongoClient} from 'mongodb';
import {getModelToken} from '@nestjs/mongoose';
import {Review, ReviewDocument, ReviewSchema} from './review.schema';
import {User, UserDocument, UserSchema} from '../user/user.schema';
import {ReviewService} from "./review.service";
import {Product, ProductDocument, ProductSchema} from "../product/product.schema";


describe('Review', () => {
    let mongod: MongoMemoryServer;
    let mongoc: MongoClient;
    let service: ReviewService;
    let userModel: Model<UserDocument>;
    let productModel: Model<ProductDocument>;
    let reviewModel: Model<ReviewDocument>;

    beforeAll(async () => {
        let uri: string;
        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongod = await MongoMemoryServer.create();
                        uri = mongod.getUri();
                        return {uri};
                    },
                }),
                MongooseModule.forFeature([{name: Review.name, schema: ReviewSchema}]),
                MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
                MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
            ],
            providers: [ReviewService],
        }).compile();

        service = app.get<ReviewService>(ReviewService);
        reviewModel = app.get<Model<ReviewDocument>>(getModelToken(Review.name));
        userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
        productModel = app.get<Model<ProductDocument>>(getModelToken(Product.name));

        mongoc = new MongoClient(uri);
        await mongoc.connect();
    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Review', () => {
        const testUser = {username: 'luigi', id: '11'};
        const testUser2 = {username: 'mario', id: '12'};
        const testProduct = {
            id: '1',
            authorId: '11',
            author: 'luigi',
            name: 'test product 1',
            description: 'test description 1',
            price: 5,
            image: '',
            category: 'beginner',
            quantity: 10
        };
        const testProduct2 = {
            id: '2',
            authorId: '12',
            author: 'mario',
            name: 'test product 2',
            description: 'test description 2',
            price: 10,
            image: '',
            category: 'beginner',
            quantity: 10
        };
        const testReview = {
            productId: '1',
            authorId: '10',
            author: 'luigi',
            id: 'R1',
            rating: 5,
            description: 'test comment 1'
        };
        const testReview2 = {
            productId: '1',
            authorId: '10',
            author: 'luigi',
            id: 'R2',
            rating: 5,
            description: 'test comment 2'
        };
        const testReview3 = {
            productId: '1',
            authorId: '10',
            author: 'luigi',
            id: 'R3',
            rating: 5,
            description: 'test comment 3'
        };


        beforeEach(async () => {
            await mongoc.db('test').collection('reviews').deleteMany({});
            await mongoc.db('test').collection('users').deleteMany({});
            await mongoc.db('test').collection('products').deleteMany({});
            await userModel.create(testUser);
            await userModel.create(testUser2);
            await reviewModel.create(testReview);
            await reviewModel.create(testReview2);
            await reviewModel.create(testReview3);
            await productModel.create(testProduct);
            await productModel.create(testProduct2);

        });

        it('Create a review on a product', async () => {
            const createReview = await service.create(testReview, testUser, testProduct.id);

            const reviews = await userModel.findOne({username: testUser.username});

            expect(reviews.reviews).toHaveLength(1);
        });

        it('Create a review on a product but with incorrect rating, so it will throw an error', async () => {
            const failedReview = {
                productId: '1',
                authorId: '10',
                author: 'luigi',
                id: 'R1',
                rating: 11,
                description: 'test comment 1'
            };
            const failedReview2 = {
                productId: '1',
                authorId: '10',
                author: 'luigi',
                id: 'R1',
                rating: 8.5,
                description: 'test comment 1'
            };

            expect(service.create(failedReview, testUser, testProduct.id)).rejects.toThrowError();
            expect(service.create(failedReview2, testUser, testProduct.id)).rejects.toThrowError();
        });

        it('Create a review on a product but with incorrect product id, so it will throw an error', async () => {
            const failedReview = {
                productId: '3',
                authorId: '10',
                author: 'luigi',
                id: 'R1',
                rating: 5,
                description: 'test comment 1'
            };

            expect(service.create(failedReview, testUser, testProduct.id)).rejects.toThrowError();

        });
    });
});