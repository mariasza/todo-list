import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './../../database/models/user.model';
import { configSequelize } from './../../database/sequelizeOptions';
import { jwtConstants } from './../../utils/auth/constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot(configSequelize),
        SequelizeModule.forFeature([User]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })],
        controllers: [UserController],
        providers: [UserService],
    }).compile();

    controller = app.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
