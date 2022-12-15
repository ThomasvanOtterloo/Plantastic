import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import {ProductService} from "./product.service";
import {User} from "../user/user.schema";
import {Token} from "../auth/token.decorator";
import {Product, Review} from "@find-a-buddy/data";

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ // mock the service, to avoid providing its dependencies
        provide: ProductService,
        useValue: {
          getAll: jest.fn(),
          delete: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
        }
      }]}).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('create', () => {
    it('calls create on the service', async () => {
      const create = jest.spyOn(productService, 'create')
          .mockImplementation(() => Promise.resolve({} as Product));

      const token = {id: '123', username: 'thomas', token:'asd'} as Token;
      const product = {
        id: '123',
        author: 'thomas',
        authorId: '123',
        name: 'test',
        description: 'test',
        image: 'test',
        quantity: 1,
        price: 1,
        reviews: [] as Review[],
        category: []
      } as Product;

      await controller.create(token,product);

      expect(create).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('calls delete on the service', async () => {
      const create = jest.spyOn(productService, 'delete')
          .mockImplementation(() => Promise.resolve({} as null));

      const token = {id: '123', username: 'thomas', token:'asd'} as Token;
      const product = {
        id: '123',
        author: 'thomas',
        authorId: '123',
        name: 'test',
        description: 'test',
        image: 'test',
        quantity: 1,
        price: 1,
        reviews: [] as Review[],
        category: []
      } as Product;

      await controller.delete(token,product.id);
      expect(create).toBeCalledTimes(1);
    });
  });


});
