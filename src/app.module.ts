import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { TodoModule } from './app/todo/todo.module';
import { UserModule } from './app/user/user.module';

import { JwtStrategy } from './utils/auth/jwt.strategy';
import { JwtAuthGuard } from './utils/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

import { PaginationService } from './utils/pagination/pagination.service';
import { User } from './database/models/user.model';
import { Todo } from './database/models/todo.model';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: '12345',
    database: 'mysqldb',
    timezone: '-03:00',
    models: [User, Todo],
  }),
    TodoModule, UserModule],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PaginationService],
})
export class AppModule { }
