import { SequelizeModuleOptions } from "@nestjs/sequelize";

export const configSequelize: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: '12345',
    database: 'mysqldb',
    models: [ ],
    logging: false,
    timezone: '-04:00',
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }