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

  @Column({ references: { model: 'User', key: 'email' } })
  userEmail: string;
}

export enum TodoStatus {
  PROGRESS = 'Em andamento',
  COMPLETED = 'Finalizado',
  DELAYED = 'Atrasado',
}