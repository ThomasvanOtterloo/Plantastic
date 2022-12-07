import {Review, User, UserInfo} from '@find-a-buddy/data';
import { Test, TestingModule } from '@nestjs/testing';
import {FollowController} from "./follow.controller";
import {FollowService} from "./follow.service";
import {Follow} from "./follow.schema";
import {InjectToken, Token} from '../auth/token.decorator';


describe('AuthController', () => {
    let app: TestingModule;
    let followController: FollowController;
    let followService: FollowService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [FollowController],
            providers: [{ // mock the auth service, to avoid providing its dependencies
                provide: FollowService,
                useValue: {
                    Follow: jest.fn(),
                    Unfollow: jest.fn(),
                    CheckIfFollowed: jest.fn(),
                },
            }],
        }).compile();

        followController = app.get<FollowController>(FollowController);
        followService = app.get<FollowService>(FollowService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });


    describe('follow', () => {
        it('calls Follow on the service', async () => {
            const follow = jest.spyOn(followService, 'Follow')
                .mockImplementation(() => Promise.resolve({} as Follow[]));

            const token = {id: '123', username: 'thomas', token:'asd'} as Token;
            const following = {
                username: 'thomas',
            } as Follow;

            await followController.Follow( token , following,);

            expect(follow).toBeCalledTimes(1);
        });
    });

    describe('unfollow', () => {
        it('calls Follow on the service', async () => {
            const follow = jest.spyOn(followService, 'Unfollow')
                .mockImplementation(() => Promise.resolve({} as Follow[]));

            const token = {id: '123', username: 'thomas', token:'asd'} as Token;
            const following = {
                username: 'thomas',
            } as Follow;

            await followController.Unfollow( token , following.username,);

            expect(follow).toBeCalledTimes(1);
        });
    });


});
