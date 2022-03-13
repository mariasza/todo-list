import { Module } from '@nestjs/common';
import { PaginationService } from './utils/pagination.service';
import { TodoModule } from './app/todo/todo.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [TodoModule, UserModule],
  providers: [PaginationService],
})
export class AppModule {}
