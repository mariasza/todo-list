import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/utils/auth/constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @ApiOperation({ summary: 'Create account' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);

    throw new HttpException({
      message: { pt: "Conta criada", en: "Account created" }, result, status: HttpStatus.OK
    }, HttpStatus.OK);
  }

  @Public()
  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.userService.findOneForEmail(email);

    if (!user) {
      throw new HttpException({
        message: { pt: "Usuário não encontrado", en: "User not found" }
      }, HttpStatus.NOT_FOUND);
    }

    const checkPassword = await this.userService.checkPassword(password, user.password);

    if (!checkPassword) {
      throw new HttpException({
        message: { pt: "Email ou senha incorretos", en: "Email or password incorrect" }
      }, HttpStatus.UNAUTHORIZED);
    }

    const token = await this.userService.login(user);

    throw new HttpException({
      message: { pt: "Login realizado com sucesso", en: "Login successfully" }, result: token, status: HttpStatus.OK
    }, HttpStatus.OK);
  }

  @ApiOperation({ summary: 'Return if user is administrator' })
  @ApiBearerAuth()
  @Get('isAdmin')
  isAdmin(@Req() request,) {
    const token = this.userService.getToken(request.headers['authorization']);
    const { userId } = this.userService.decodeToken(token);
    return this.userService.isAdmin(userId);
  }

  @ApiOperation({ summary: 'Find all users' })
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
