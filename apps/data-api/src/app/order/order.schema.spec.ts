import { Test } from '@nestjs/testing';

import { MongoClient } from 'mongodb';
import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Order, OrderDocument, OrderSchema } from "./order.schema";

describe('Order Schema', () => {
    let mongod: MongoMemoryServer;
    let mongoc: MongoClient;
    let orderDocument: Model<OrderDocument>;

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
                MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])
            ],
        }).compile();

        orderDocument = app.get<Model<OrderDocument>>(getModelToken(Order.name));

        // not entirely sure why we need to wait for this...
        // https://github.com/nodkz/mongodb-memory-server/issues/102
        await orderDocument.ensureIndexes();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('orders').deleteMany({});
    });

    afterAll(async () => {
        await disconnect();
        await mongod.stop();
        await mongoc.close();
    });


    it('has a required quantity', () => {
        const model = new orderDocument();

        const err = model.validateSync();

        expect(err.errors.quantity).toBeInstanceOf(Error);
    });

    it('Has a required userId', function () {
        const model = new orderDocument();

        const err = model.validateSync();

        expect(err.errors.authorId).toBeInstanceOf(Error);
    });

    it('Has a required deliveryDate', function () {
        const model = new orderDocument();

        const err = model.validateSync();

        expect(err.errors.deliveryDate).toBeInstanceOf(Error);
    });
});