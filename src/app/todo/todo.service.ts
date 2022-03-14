import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './../../database/models/todo.model';
import { PaginationService } from './../../utils/pagination/pagination.service';
import { TodoDto } from './dto/todo.dto';
import { Op, Sequelize } from 'sequelize';


import * as moment from 'moment'

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel, private readonly paginationService: PaginationService) { }

  async create(data: TodoDto, userEmail: string) {

    const todo = await this.todoModel.create({ ...data, userEmail }).catch((error) => {
      console.log(error)
      throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    })

    return todo;
  }

  async findAll(page: number, size: number, delayed: any) {
    const { limit, offset } = this.paginationService.getPagination(page, size);

    let query: any = { attributes: ['id', 'description', 'deadline', 'userEmail'], limit, offset };

    if (delayed === 'true') {
      const now = moment.utc(new Date()).format();
      query = { ...query, where: { deadline: { [Op.lt]: now } } }
    }

    let result: any;
    await this.todoModel.findAndCountAll(query).then(res => {
      res = JSON.parse(JSON.stringify(res, null, 0));
      result = this.paginationService.getPagingData(res, page, limit);
    })

    return result;
  }

  async findAllbyUser(userEmail: string) {
    return await this.todoModel.findAll({ where: { userEmail } });
  }

  async findOne(id: number) {
    return await this.todoModel.findOne({ where: { id } });
  }

  async update(id: number, data: TodoDto) {

    await this.todoModel.update(data, { where: { id } }).catch((error) => {
      console.log(error)
      throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    })

    return await this.findOne(id);
  }

  async finish(id: number) {
    await this.todoModel.update({ finishAt: Sequelize.fn('NOW')}, { where: { id } }).catch((error) => {
      console.log(error)
      throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    })

    return await this.findOne(id);
  }
}
