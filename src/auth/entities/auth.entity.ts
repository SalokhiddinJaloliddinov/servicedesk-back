import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonEntity } from '../../person/entities/person.entity';

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
