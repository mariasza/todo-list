import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { UserService } from '../user/user.service';
import { Todo, TodoStatus } from './../../database/models/todo.model';

@ApiTags('TODO')
@ApiBearerAuth()
@ApiInternalServerErrorResponse()
@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
  ) { }

  @ApiOperation({ summary: 'Create TODO' })
  @ApiOkResponse({ description: 'TODO created' })
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Req() request, @Body() TodoDto: TodoDto) {
    let result: any;
    const token = this.userService.getToken(request.headers['authorization']);
    const { userEmail } = this.userService.decodeToken(token);

    result = await this.todoService.create(TodoDto, userEmail)

    throw new HttpException({
      message: { pt: "TODO criada", en: "TODO created" }, result, status: HttpStatus.OK
    }, HttpStatus.OK);
  }


  @ApiOperation({ summary: 'Find all TODO' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'User does not have access to this function' })
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Req() request,
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('delayed') delayed: boolean) {
    let result: any;
    const token = this.userService.getToken(request.headers['authorization']);
    const { userId } = this.userService.decodeToken(token);

    const isAdmin = await this.userService.isAdmin(userId);

    if (!isAdmin) {
      throw new HttpException({
        message: { pt: "Usuário não tem acesso a essa função", en: "User does not have access to this function" }
      }, HttpStatus.UNAUTHORIZED);
    }

    result = await this.todoService.findAll(page, size, delayed);

    return result;
  }

  @ApiOperation({ summary: 'Find all user TODO' })
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @Get('byUser')
  async findAllByUser(@Req() request) {
    let result: any;

    const token = this.userService.getToken(request.headers['authorization']);
    const { userEmail } = this.userService.decodeToken(token);

    result = await this.todoService.findAllbyUser(userEmail);

    const now = new Date();
    result = result.map((todo: Todo) => {
      let status = TodoStatus.PROGRESS

      if (todo.finishAt) {
        status = TodoStatus.COMPLETED
      }

      if (todo.deadline < now && status != TodoStatus.COMPLETED) {
        status = TodoStatus.DELAYED
      }

      todo = JSON.parse(JSON.stringify(todo, null, 0));
      return { ...todo, status }
    })

    return result
  }

  @ApiOperation({ summary: 'Find one TODO' })
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @ApiOperation({ summary: 'Update TODO' })
  @ApiOkResponse({ description: 'TODO updated' })
  @ApiBadRequestResponse({ description: 'TODO completed cannot be updated!' })
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTodoDto: TodoDto) {
    let result: any;
    const todo = await this.todoService.findOne(id);

    if (todo.finishAt) {
      throw new HttpException({
        message: { pt: "TODO concluída não pode ser atualizada!", en: "TODO completed cannot be updated!" }
      }, HttpStatus.BAD_REQUEST);
    }

    result = await this.todoService.update(id, updateTodoDto)

    throw new HttpException({
      message: { pt: "TODO atualizado", en: "TODO updated" }, result, status: HttpStatus.OK
    }, HttpStatus.OK);
  }

  @ApiOperation({ summary: 'Finish TODO' })
  @ApiOkResponse({ description: 'TODO finished' })
  @ApiInternalServerErrorResponse()
  @Patch('finish/:id')
  async finish(@Param('id') id: number) {
    const result = await this.todoService.finish(id);

    throw new HttpException({
      message: { pt: "TODO finalizado", en: "TODO finished" }, result, status: HttpStatus.OK
    }, HttpStatus.OK);
  }
}

