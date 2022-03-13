import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true })
  id: number;

  @Column
  email: string;

  @Column
  senha: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
