import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@ApiTags('TODO')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService,
    private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Create TODO' })
  @Post()
  async create(@Req() request, @Body() createTodoDto: CreateTodoDto) {
    let result: any;
    const token = this.userService.getToken(request.headers['authorization']);
    const { userEmail } = this.userService.decodeToken(token);

    result = await this.todoService.create(createTodoDto, userEmail)

    throw new HttpException({
      message: { pt: "TODO criado", en: "TODO created" }, result, status: HttpStatus.OK
    }, HttpStatus.OK);
  }

  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    let result: any;
    const todo = await this.todoService.findOne(id);

    if (todo.finishAt) {
      throw new HttpException({
        message: { pt: "TODO concluído não pode ser atualizado!", en: "TODO completed cannot be updated!" }
      }, HttpStatus.NOT_FOUND);
    }

    result = await this.todoService.update(id, updateTodoDto)

    throw new HttpException({
      message: { pt: "TODO atualizado", en: "TODO updated" }, result, status: HttpStatus.OK
    }, HttpStatus.OK);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.todoService.remove(id);
  }
}

