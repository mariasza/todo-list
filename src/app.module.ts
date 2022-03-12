import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaginationService } from './utils/pagination/pagination.service';
import { TodoModule } from './app/todo/todo.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [TodoModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PaginationService],
})
export class AppModule {}
