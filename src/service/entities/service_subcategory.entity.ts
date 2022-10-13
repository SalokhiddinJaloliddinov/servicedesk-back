import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_Servicesubcategory')
export class ServiceSubcategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  service_id: string;

  @Column()
  service_name: string;

  @Column()
  request_type: string;
}
