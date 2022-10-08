import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('priv_urp_profiles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
