import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './../../database/models/user.model';
import { configSequelize } from './../../database/sequelizeOptions';
import { jwtConstants } from './../../utils/auth/constants';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot(configSequelize),
        SequelizeModule.forFeature([User]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })],
        providers: [UserService],
    }).compile();

    service = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
