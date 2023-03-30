import { Test } from '@nestjs/testing';

import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect, Model } from 'mongoose';
import { MongoClient } from 'mongodb';

import { UserService } from './user.service';
import { User, UserDocument, UserSchema } from './user.schema';

describe('UserService', () => {
  let service: UserService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let userModel: Model<UserDocument>;

  const testUsers = [{
    id: 'jan123',
    username: 'jan',
    wallet: 500,
    products: [],
    reviews: [],
    friends: [],
  }, {
    id: 'peter123',
    username: 'peter',
    wallet: 500,
    products: [],
    reviews: [],
    friends: [],
    }, {
    id: 'maria123',
    username: 'maria',
    wallet: 500,
    products: [],
    reviews: [],
    friends: [],
  }
  ];

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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        // MongooseModule.forFeature([{ name: Meetup.name, schema: MeetupSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = app.get<UserService>(UserService);
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    // meetupModel = app.get<Model<MeetupDocument>>(getModelToken(Meetup.name));

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('users').deleteMany({});
    // await mongoc.db('plantastic').collection('meetups').deleteMany({});

    const user1 = new userModel(testUsers[0]);
    const user2 = new userModel(testUsers[1]);
    const user3 = new userModel(testUsers[2]);



    await Promise.all([user1.save(), user2.save(), user3.save()]);
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  describe('getAll', () => {
    it('should retrieve all users', async () => {
      const results = await service.getAll();

      expect(results).toHaveLength(3);
      expect(results.map(r => r.username)).toContain('jan');
      expect(results.map(r => r.username)).toContain('peter');
      expect(results.map(r => r.username)).toContain('maria');
    });

    it('should not give meetups or reviews', async () => {
      const results = await service.getAll();

      expect(results[0]).toHaveProperty('products');
      expect(results[0]).toHaveProperty('reviews');
      expect(results[0]).toHaveProperty('following');
    });

  });

  describe('getOne', () => {
    it('should retrieve a specific user', async () => {
      const result = await service.getOne('jan123');

      expect(result).toBeDefined();
    });

    it('returns null when user is not found', async () => {
      const result = await service.getOne('niemand');

      expect(result).toBeUndefined();
    });


    it('gives all reviews of this user', async () => {
      const result = await service.getOne('jan123');

      expect(result).toHaveProperty('reviews');
      expect(result.reviews).toHaveLength(0);
    });
  });
});
