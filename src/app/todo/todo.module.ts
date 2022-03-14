import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './../../database/models/todo.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from '../user/user.service';
import { User } from './../../database/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './../../utils/auth/constants';
import { PaginationService } from './../../utils/pagination/pagination.service';

@Module({
  imports: [SequelizeModule.forFeature([Todo, User]), 
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [TodoController],
  providers: [TodoService, UserService, PaginationService]
})
export class TodoModule {}
