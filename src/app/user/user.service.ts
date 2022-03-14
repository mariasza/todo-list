
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel,
    private jwtService: JwtService
  ) { }

  async create(data: CreateUserDto) {
    const { password } = data
    data.password = await bcryptjs.hash(password, 8)
    await this.userModel.create(data).catch((error) => {
      throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    })
  }

  async login(user: any) {
    return {
      access_token: this.createToken({ userId: user.id, userEmail: user.email}),
    };
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findOne({ where: { id } });
  }

  async findOneForEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async remove(id: number) {
    return await this.userModel.remove({ where: { id } });
  }

  async checkPassword(password: string, hash: string) {
    return await bcryptjs.compare(password, hash);
  }

  createToken(data): string {
    return this.jwtService.sign(data);
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
