import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Todo extends Model<Todo> {
  @Column({ primaryKey: true })
  id: number;

  @Column
  description: string;

  @Column
  deadline: Date;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  finishAt: Date;

  @Column({ references: { model: 'User', key: 'id' } })
  idUser: number;
}