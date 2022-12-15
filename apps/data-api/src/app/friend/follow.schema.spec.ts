import { Test } from '@nestjs/testing';

import { MongoClient } from 'mongodb';
import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Follow, FollowDocument, FollowSchema } from "./follow.schema";

describe('follow Schema', () => {
    let mongod: MongoMemoryServer;
    let mongoc: MongoClient;
    let followDocument: Model<FollowDocument>;

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
                MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }])
            ],
        }).compile();

        followDocument = app.get<Model<FollowDocument>>(getModelToken(Follow.name));

        // not entirely sure why we need to wait for this...
        // https://github.com/nodkz/mongodb-memory-server/issues/102
        await followDocument.ensureIndexes();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('follows').deleteMany({});
    });

    afterAll(async () => {
        await disconnect();
        await mongod.stop();
        await mongoc.close();
    });


    it('has a required username', () => {
        const model = new followDocument();

        const err = model.validateSync();

        expect(err.errors.username).toBeInstanceOf(Error);
    });

    it('Has a required userId', function () {
        const model = new followDocument( );

        const err = model.validateSync();

        expect(err.errors.userId).toBeInstanceOf(Error);
    });



});