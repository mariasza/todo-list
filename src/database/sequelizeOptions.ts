import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Todo } from "./models/todo.model";
import { User } from "./models/user.model";

export const configSequelize: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: '12345',
    database: 'mysqldb',
    timezone: '-03:00',
    models: [User, Todo],

}