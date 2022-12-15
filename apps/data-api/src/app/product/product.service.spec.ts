import {Test} from '@nestjs/testing';

import {MongooseModule} from '@nestjs/mongoose';
import {sign} from 'jsonwebtoken';
import {hashSync} from 'bcrypt';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {disconnect, Model} from 'mongoose';
import {MongoClient} from 'mongodb';
import {getModelToken} from '@nestjs/mongoose';
import {User, UserDocument, UserSchema} from '../user/user.schema';
import {Product, ProductDocument, ProductSchema} from "./product.schema";
import {ProductService} from "./product.service";

describe('Product', () => {
    let mongod: MongoMemoryServer;
    let mongoc: MongoClient;
    let userModel: Model<UserDocument>;
    let productModel: Model<ProductDocument>;
    let service: ProductService;

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
                MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
                MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
            ],
            providers: [ProductService],
        }).compile();

        service = app.get<ProductService>(ProductService);
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

    describe('Product', () => {
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
        const newProduct = {
            name: 'test product 1',
            description: 'test edited 1',
            price: 5,
            image: '',
            category: ['Beginner plants'],
            quantity: 10,
            authorId: '11',
        } as unknown as Product;


        beforeEach(async () => {
            await mongoc.db('test').collection('users').deleteMany({});
            await mongoc.db('test').collection('products').deleteMany({});
            await userModel.create(testUser);
            await userModel.create(testUser2);
            await productModel.create(testProduct);
            await productModel.create(testProduct2);

        });

        it('Create a valid product.', async () => {
            const createProduct = await service.create(newProduct, testUser);

            const products = await productModel.findOne({id: createProduct.id});

            expect(products.category).toHaveLength(1);
            expect(products.category[0]).toEqual('Beginner plants');
            expect(products.author).toEqual(testUser.username);
            expect(products.authorId).toEqual(testUser.id);
        });

        it('Create a product but with incorrect properties, so it will throw an error', async () => {

            const failedProduct = {
                name: 'test product 1',
                description: 'test description 1',
                price: 0,
                image: '',
                category: ['Beginner plants'],
                quantity: 10,
            } as unknown as Product;

            const failedProduct1 = {
                name: 'test product 1',
                description: 'test description 1',
                price: 5,
                image: '',
                category: ['Beginner plants'],
                quantity: 0,
            } as unknown as Product;

            const failedProduct2 = {
                name: 'test product 1',
                description: 'test description 1',
                price: 5,
                image: '',
                quantity: 10,
            } as unknown as Product;

            expect(service.create(failedProduct, testUser)).rejects.toThrowError();
            expect(service.create(failedProduct1, testUser)).rejects.toThrowError();
            expect(service.create(failedProduct2, testUser)).rejects.toThrowError();
        });


        it('Delete a product', async () => {
            const deleteProduct = await service.delete(testProduct.id, testUser);

            const products = await productModel.findOne({id: testProduct.id});

            expect(products).toBeNull();
            expect(products).not.toEqual(testProduct);
        });

        it('Update a product', async () => {
            const updateProduct = await service.update(testProduct.id, newProduct, testUser);

            console.log(testProduct.id, newProduct, testUser);

            const products = await productModel.findOne({id: testProduct.id});

            expect(products.category).toHaveLength(1);
            expect(products.category[0]).toEqual('Beginner plants');
            expect(products.author).toEqual(testUser.username);
            expect(products.authorId).toEqual(testUser.id);
        });



    });
});