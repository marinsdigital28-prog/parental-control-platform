import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Device } from '../devices/device.entity';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'device_id', unique: true })
  @Index()
  deviceId: string;

  @Column({ name: 'daily_limit_minutes', type: 'int', nullable: true })
  dailyLimitMinutes: number | null;

  @Column({ name: 'bedtime_start', type: 'time', nullable: true })
  bedtimeStart: string | null;

  @Column({ name: 'bedtime_end', type: 'time', nullable: true })
  bedtimeEnd: string | null;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'int', default: 1 })
  version: number;

  @ManyToOne(() => Device, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
