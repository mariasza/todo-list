import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Todo } from './../../database/models/todo.model';
import { User } from './../../database/models/user.model';
import { jwtConstants } from './../../utils/auth/constants';
import { UserService } from '../user/user.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { configSequelize } from './../../database/sequelizeOptions';

describe('TodoController Unit Tests', () => {
  let controller: TodoController;
  let spyService: TodoService

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: TodoService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findAllbyUser: jest.fn(() => []),
        findOne: jest.fn(() => []),
        update: jest.fn(() => []),
        finish: jest.fn(() => [])
      })
    }

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot(configSequelize),
        SequelizeModule.forFeature([Todo, User]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })],
      controllers: [TodoController],
      providers: [TodoService, UserService, ApiServiceProvider]
    }).compile();

    controller = app.get<TodoController>(TodoController);
    spyService = app.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
