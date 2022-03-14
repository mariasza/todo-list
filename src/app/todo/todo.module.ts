import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from 'src/database/models/todo.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from '../user/user.service';
import { User } from 'src/database/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/auth/constants';

@Module({
  imports: [SequelizeModule.forFeature([Todo, User]), 
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [TodoController],
  providers: [TodoService, UserService]
})
export class TodoModule {}
