import { UserInfo} from '@find-a-buddy/data';
import { Test, TestingModule } from '@nestjs/testing';

import {ReviewService} from "./review.service";
import {ReviewController} from "./review.controller";
import {Review} from "@find-a-buddy/data";
import {InjectToken, Token} from '../auth/token.decorator';
// import {User} from "@find-a-buddy/data";
import {User, UserDocument} from "../user/user.schema";

describe('ReviewController', () => {
    let app: TestingModule;
    let reviewController: ReviewController;
    let reviewService: ReviewService;



    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [ReviewController],
            providers: [{
                provide: ReviewService,
                useValue: {
                    create: jest.fn(),
                    update: jest.fn(),
                    delete: jest.fn(),
                },
            }],
        }).compile();

        reviewController = app.get<ReviewController>(ReviewController);
        reviewService = app.get<ReviewService>(ReviewService);

    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('calls create on the service', async () => {
            const create = jest.spyOn(reviewService, 'create')
                .mockImplementation(() => Promise.resolve({} as User));

            const token = {id: '123', username: 'thomas', token:'asd'} as Token;
            const review = {rating: 5, description:'asd'} as Review;
            const productId = '123';

            await reviewController.create(token, productId, review);

            expect(create).toBeCalledTimes(1);
        });
    });

    describe('update', () => {
        it('calls update on the service', async () => {
           const update = jest.spyOn(reviewService, 'update')
                .mockImplementation(() => Promise.resolve({} as Review));

            const token = {id: '123', username: 'thomas', token:'asd'} as Token;
            const review = {rating: 5, description:'asd'} as Review;
            const productId = '123';

            await reviewController.update(token.id, review,);

            expect(update).toBeCalledTimes(1);
        });
    });
});
