import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_person')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  friendlyname: string;

  @Column()
  first_name: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  status: string;

  @Column()
  picture_data: string;
}
