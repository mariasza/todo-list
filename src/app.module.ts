import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { TodoModule } from './app/todo/todo.module';
import { UserModule } from './app/user/user.module';

import { JwtStrategy } from './utils/auth/jwt.strategy';
import { JwtAuthGuard } from './utils/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

import { PaginationService } from './utils/pagination/pagination.service';
import { configSequelize } from './database/sequelizeOptions';

@Module({
  imports: [
    SequelizeModule.forRoot(configSequelize),
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
