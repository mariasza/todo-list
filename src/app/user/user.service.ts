
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel,
  ) { }

  async create(data: CreateUserDto) {
    const { password } = data
    data.password = await bcryptjs.hash(password, 8)
    await this.userModel.create(data)
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.userModel.remove({ where: { id } });
  }
}
