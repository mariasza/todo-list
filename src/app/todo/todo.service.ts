import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'src/database/models/todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo) private todoModel,
  ) { }

  async create(data: CreateTodoDto, userEmail: string) {

    const todo = await this.todoModel.create({ ...data, userEmail }).catch((error) => {
      console.log(error)
      throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    })

    return todo;
  }

  async findAll() {
    return await this.todoModel.findAll();
  }

  async findAllForUser(userEmail: string) {
    return await this.todoModel.findAll({ where: { userEmail } });
  }

  async findOne(id: number) {
    return await this.todoModel.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateTodoDto) {

    await this.todoModel.update(data, { where: { id } }).catch((error) => {
      console.log(error)
      throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    })

    return await this.findOne(id);
  }

  async remove(id: number) {
    return `This action removes a #${id} todo`;
  }

  getToken(header: string) {
    const [, token] = header.split(' ')
    return token
  }
}
