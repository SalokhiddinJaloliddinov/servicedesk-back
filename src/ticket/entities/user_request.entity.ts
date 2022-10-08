import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_UserRequest')
export class UserRequestEntity {
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
