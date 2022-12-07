import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';

import { UserService } from './user.service';
import {Id, User, UserInfo} from "@find-a-buddy/data";

describe('TopicController', () => {
  let app: TestingModule;
  let userController: UserController;
  let userService: UserService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ // mock the service, to avoid providing its dependencies
        provide: UserService,
        useValue: {
          getAll: jest.fn(),
          getOne: jest.fn(),
        },
      }],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  describe('getAll', () => {
    it('should call getAll on the service', async () => {

      const users: User[] = [
        {
          id: '1',
          username: 'test',
          password: 'test',
          token: 'test',
          wallet: 0,
          products: [],
          reviews: [],
          following: [],
          orders: [],
        },
      ];
      jest.spyOn(userService, 'getAll').mockImplementation(() => Promise.resolve(users));
      expect(await userController.getAll()).toBe(users);
      expect(userService.getAll).toHaveBeenCalled();
      expect(userService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOne & getSelf', () => {
    it('should call getOne on the service with id from parameter', async () => {
      const user: User = {
        id: '1',
        username: 'test',
        password: 'test',
        token: 'test',
        wallet: 0,
        products: [],
        reviews: [],
        following: [],
        orders: [],
      };

      const token = {
        username: 'test',
        id: '1',
      }

      jest.spyOn(userService, 'getOne').mockImplementation(() => Promise.resolve(user));
      expect(await userController.getOne('1')).toBe(user);
      expect(userService.getOne).toHaveBeenCalled();
      expect(userService.getOne).toHaveBeenCalledTimes(1);
      expect(userService.getOne).toHaveBeenCalledWith('1');

      expect(await userController.getSelf(token)).toBe(user);
      expect(userService.getOne).toHaveBeenCalled();
      expect(userService.getOne).toHaveBeenCalledTimes(2);
      expect(userService.getOne).toHaveBeenCalledWith('1');
    });
  });
});
