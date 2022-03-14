import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoService } from './todo.service';
import { Todo } from './../../database/models/todo.model';
import { configSequelize } from './../../database/sequelizeOptions';
import { PaginationService } from './../../utils/pagination/pagination.service';
import TodoDto from './dto/todo.dto';

class ApiServiceMock {
  create(dto: any) {
    return {};
  }

  findAll() {
    return [];
  }

  findAllbyUser() {
    return [];
  }

  findOne() {
    return {};
  }

  update() {
    return {};
  }

  finish() {
    return {};
  }
}

describe('TodoService', () => {
  let service: TodoService;

  beforeAll(async () => {

    const ApiServiceProvider = {
      provide: TodoService,
      useClass: ApiServiceMock,
    }

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot(configSequelize),
        SequelizeModule.forFeature([Todo])],
      providers: [TodoService, PaginationService, ApiServiceProvider]
    }).compile();

    service = app.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = new TodoDto();
    const email = 'email@test.com'
    service.create(dto, email);
    expect(createSpy).toHaveBeenCalledWith(dto, email);
  });

  it('should call findAll method with expected param', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll');
    service.findAll(0,0,0);
    expect(findAllSpy).toHaveBeenCalledWith(0,0,0);
  });

  it('should call findAllbyUser method with expected param', async () => {
    const findAllbyUserSpy = jest.spyOn(service, 'findAllbyUser');
    const email = 'email@test.com'
    service.findAllbyUser(email);
    expect(findAllbyUserSpy).toHaveBeenCalledWith(email);
  });

  it('should call findOne method with expected param', async () => {
    const findOneSpy = jest.spyOn(service, 'findOne');
    service.findOne(0);
    expect(findOneSpy).toHaveBeenCalledWith(0);
  });

  it('should call update method with expected params', async () => {
    const updateSpy = jest.spyOn(service, 'update');
    const dto = new TodoDto();
    service.update(0, dto);
    expect(updateSpy).toHaveBeenCalledWith(0, dto);
  });

  it('should call finish method with expected params', async () => {
    const finishSpy = jest.spyOn(service, 'finish');
    service.finish(0);
    expect(finishSpy).toHaveBeenCalledWith(0);
  });

});
