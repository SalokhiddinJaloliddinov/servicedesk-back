import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_Incident')
export class IncidentEntity {
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
  team_id_friendlyname: string;

  @Column()
  team_id: number;

  @Column()
  service_id: number;

  @Column()
  service_name: string;

  @Column()
  servicesubcategory_id: number;

  @Column()
  servicesubcategory_name: string;

  @Column()
  status: string;

  @Column()
  finalclass: string;

  //  Dates
  @Column({ type: 'datetime' })
  last_update: Date;

  @Column({ type: 'datetime' })
  start_date: Date;

  @Column({ type: 'datetime' })
  assignment_date: Date;

  @Column({ type: 'datetime' })
  resolution_date: Date;

  @Column({ type: 'datetime' })
  last_pending_date: Date;

  @Column({ type: 'datetime' })
  close_date: Date;

  // Reasons
  @Column()
  reassign_reason: string;

  @Column()
  dispatch_reason: string;

  @Column()
  pending_reason: string;

  @Column()
  escalation_reason: string;
}
