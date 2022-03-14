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

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }

  getToken(header: string) {
    const [, token] = header.split(' ')
    return token
  }
}
