import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoService } from './todo.service';
import { Todo } from './../../database/models/todo.model';
import { User } from './../../database/models/user.model';
import { jwtConstants } from './../../utils/auth/constants';
import { UserService } from '../user/user.service';
import { TodoController } from './todo.controller';
import { configSequelize } from './../../database/sequelizeOptions';
import { PaginationService } from './../../utils/pagination/pagination.service';


describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot(configSequelize),
        SequelizeModule.forFeature([Todo])],
      providers: [TodoService, PaginationService]
    }).compile();

    service = app.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
