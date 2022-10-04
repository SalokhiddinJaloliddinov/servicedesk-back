import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  friendlyname: string;
}
