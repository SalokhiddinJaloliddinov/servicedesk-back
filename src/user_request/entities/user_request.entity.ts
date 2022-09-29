import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

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

  @Column()
  caller_id_friendlyname: string;

  @Column()
  caller_id: number;

  @Column()
  agent_id_friendlyname: string;

  @Column()
  agent_id: number;

  @Column()
  team_name: string;

  @Column()
  servicesubcategory_name: string;

  @Column({ type: 'datetime' })
  last_update: Date;

  @Column()
  status: string;
}
