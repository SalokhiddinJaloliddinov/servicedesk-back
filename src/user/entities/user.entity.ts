import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_Person')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  friendlyname: string;

  @Column()
  email: string;

  @Column()
  status: string;

  @Column()
  function: string;
}
