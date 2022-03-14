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
    const token = this.todoService.getToken(request.headers['authorization']);
    const { userEmail } = this.userService.decodeToken(token);

    const result = await this.todoService.create(createTodoDto, userEmail)

    throw new HttpException({
      message: { pt: "TODO criado", en: "TODO created" }, result, status: HttpStatus.OK
    }, HttpStatus.OK);
  }

  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
function Public() {
  throw new Error('Function not implemented.');
}

