
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './../../database/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel, private jwtService: JwtService) { }

  async create(data: CreateUserDto) {
    const { password } = data
    data.password = await bcryptjs.hash(password, 8)
    await this.userModel.create(data).catch((error) => {
      throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    })
  }

  async login(user: any) {
    return {
      access_token: this.createToken({ userId: user.id, userEmail: user.email }),
    };
  }

  async findOneForEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async checkPassword(password: string, hash: string) {
    return await bcryptjs.compare(password, hash);
  }

  isAdmin(id: number) {
    return id === 1
  }

  createToken(data): string {
    return this.jwtService.sign(data);
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }

  getToken(header: string) {
    const [, token] = header.split(' ')
    return token
  }
}
