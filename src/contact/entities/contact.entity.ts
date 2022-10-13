import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_Contact')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  friendlyname: string;

  @Column()
  status: string;

  @Column()
  finalclass: string;
}
