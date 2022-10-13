import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_Service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  friendlyname: string;

  @Column()
  servicefamily_id: number;

  @Column()
  servicefamily_name: string;

  @Column()
  icon_data: string;
}
