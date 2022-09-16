import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Entity('view_UserRequest')
export class UserRequestEntity {
  constructor(private readonly httpService: HttpService) {
    let sss = 'test';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ref: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
