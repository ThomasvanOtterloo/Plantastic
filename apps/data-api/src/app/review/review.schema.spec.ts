import { Test } from '@nestjs/testing';

import { MongoClient } from 'mongodb';
import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Review, ReviewDocument, ReviewSchema } from "./review.schema";

describe('Order Schema', () => {
    let mongod: MongoMemoryServer;
    let mongoc: MongoClient;
    let reviewDocument: Model<ReviewDocument>;

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
                MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])
            ],
        }).compile();

        reviewDocument = app.get<Model<ReviewDocument>>(getModelToken(Review.name));

        // not entirely sure why we need to wait for this...
        // https://github.com/nodkz/mongodb-memory-server/issues/102
        await reviewDocument.ensureIndexes();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('reviews').deleteMany({});
    });

    afterAll(async () => {
        await disconnect();
        await mongod.stop();
        await mongoc.close();
    });

    describe('review', () => {
        // it('Has a required rating', function () {
        //     const model = new reviewDocument( );
        //
        //     const err = model.validateSync();
        //
        //     expect(err.errors.rating).toBeInstanceOf(Error);
        // });

        it('Has a required description', function () {
            const model = new reviewDocument( );

            const err = model.validateSync();

            expect(err.errors.description).toBeInstanceOf(Error);
        });

    });
});