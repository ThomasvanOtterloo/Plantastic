import { Test } from '@nestjs/testing';

import { MongoClient } from 'mongodb';
import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Product, ProductDocument, ProductSchema } from "./product.schema";

describe('Order Schema', () => {
    let mongod: MongoMemoryServer;
    let mongoc: MongoClient;
    let productDocument: Model<ProductDocument>;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongod = await MongoMemoryServer.create();
                        const uri = mongod.getUri();
                        mongoc = new MongoClient(uri);
                        return {uri};
                    },
                }),
                MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
            ],
        }).compile();

        productDocument = app.get<Model<ProductDocument>>(getModelToken(Product.name));

        // not entirely sure why we need to wait for this...
        // https://github.com/nodkz/mongodb-memory-server/issues/102
        await productDocument.ensureIndexes();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('products').deleteMany({});
    });

    afterAll(async () => {
        await disconnect();
        await mongod.stop();
        await mongoc.close();
    });


    it('has a required name', () => {
        const model = new productDocument();

        const err = model.validateSync();

        expect(err.errors.name).toBeInstanceOf(Error);
    });

    it('Has a required price', function () {
        const model = new productDocument( );

        const err = model.validateSync();

        expect(err.errors.price).toBeInstanceOf(Error);
    });

    it('Has a required description', function () {
        const model = new productDocument( );

        const err = model.validateSync();

        expect(err.errors.description).toBeInstanceOf(Error);
    });


});