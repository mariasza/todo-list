import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/auth/constants';


import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/database/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
