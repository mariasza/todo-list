import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Todo, TodoStatus } from 'src/database/models/todo.model';

@ApiTags('TODO')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
  ) { }

  @ApiOperation({ summary: 'Create TODO' })
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
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @ApiOperation({ summary: 'Update TODO' })
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

  /*   @Delete(':id')
    async remove(@Param('id') id: number) {
      return this.todoService.remove(id);
    } */
}

