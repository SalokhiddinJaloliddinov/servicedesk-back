import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('priv_urp_userprofile')
export class LnkRoleToUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: number;

  @Column()
  profileid: number;
}
