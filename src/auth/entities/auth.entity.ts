import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm/browser';

@Entity('priv_user')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contactid: number;

  @Column()
  login: string;

  @Column()
  status: string;
}
