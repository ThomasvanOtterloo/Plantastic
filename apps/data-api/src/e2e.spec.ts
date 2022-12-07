import request = require('supertest');

import {MongooseModule} from "@nestjs/mongoose";
import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication, MiddlewareConsumer, Module} from '@nestjs/common';
import {RouterModule} from '@nestjs/core';

import {UserRegistration} from '@find-a-buddy/data';

import {MongoClient} from 'mongodb';
import {MongoMemoryServer} from "mongodb-memory-server";
import {disconnect} from "mongoose";

import {AuthModule} from './app/auth/auth.module';
import {DataModule} from './app/data.module';
import {TokenMiddleware} from './app/auth/token.middleware';
import {ApiResponseInterceptor} from './app/api-response.interceptor';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                return {uri};
            },
        }),
        AuthModule,
        DataModule,
        RouterModule.register([{
            path: 'auth-api',
            module: AuthModule,
        }, {
            path: 'data-api',
            module: DataModule,
        }]),
    ],
    controllers: [],
    providers: [],
})
export class TestAppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TokenMiddleware)
            .forRoutes('data-api')
    }
}

describe('end-to-end tests of data API', () => {
    let app: INestApplication;
    let server;
    let module: TestingModule;
    let mongoc: MongoClient;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TestAppModule],
        })
            .compile();

        app = module.createNestApplication();
        app.useGlobalInterceptors(new ApiResponseInterceptor());
        await app.init();

        mongoc = new MongoClient(uri);
        await mongoc.connect();

        server = app.getHttpServer();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('identities').deleteMany({});
        await mongoc.db('test').collection('users').deleteMany({});

    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    describe('single user', () => {
        let createdUser: UserRegistration;
        let testUser: UserRegistration;

        beforeEach(async () => {
            createdUser = {
                username: 'thomas',
                password: 'Secret123$',
            }
            testUser = {
                username: 'thomas',
                password: 'Secret123$',
            }


        });

        it('user/auths get called and returns error because not authorized.', async () => {
            let testUser = {
                username: 'thomas',
            }
            await request(server)
                .post('/auth-api/register')
                .send(testUser)
                .expect(400)
                .expect(res => {
                    expect(res.body).toBeDefined();
                });

            await request(server)
                .post('/auth-api/login')
                .send(testUser)
                .expect(401)
                .expect(res => {
                    expect(res.body).toBeDefined();
                });

            await request(server)
                .get('/data-api/users')
                .expect(401)
                .expect(res => {
                    expect(res.body).toBeDefined();
                });

            await request(server)
                .get('/data-api/users')
                .expect(401)
                .expect(res => {
                    expect(res.body).toBeDefined();
                });
        });


        // it('user register and login', async () => {
        //     const validUser = {
        //         username: 'thomas',
        //         password: 'Secret123$'
        //     }
        //
        //     await request(server)
        //         .post('/auth-api/register')
        //         .send(validUser)
        //         .expect(201)
        //         .expect(res => {
        //         expect(res.body).toBeDefined();
        //     }); // succesfull registration
        //
        //     await request(server)
        //         .post('/auth-api/login')
        //         .send(validUser)
        //         .expect(201)
        //         .expect(res => {
        //         expect(res.body).toBeDefined();
        //     }); // Unauthorized Like it cant find the just registered user...
        // });



    });
});
