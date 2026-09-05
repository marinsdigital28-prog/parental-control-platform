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
import { Family } from '../families/family.entity';

export enum DeviceStatus {
  PENDING = 'pending',
  ONLINE = 'online',
  OFFLINE = 'offline',
  SYNCING = 'syncing',
  ERROR = 'error',
  UNLINKED = 'unlinked',
}

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'family_id' })
  @Index()
  familyId: string;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'device_uuid', unique: true, length: 64 })
  deviceUuid: string;

  @Column({ name: 'android_version', length: 20, nullable: true })
  androidVersion: string | null;

  @Column({ length: 80, nullable: true })
  manufacturer: string | null;

  @Column({ length: 80, nullable: true })
  model: string | null;

  @Column({ name: 'app_version', length: 30, nullable: true })
  appVersion: string | null;

  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.PENDING,
  })
  status: DeviceStatus;

  @Column({ name: 'last_seen_at', type: 'timestamptz', nullable: true })
  lastSeenAt: Date | null;

  @Column({ name: 'battery_level', type: 'smallint', nullable: true })
  batteryLevel: number | null;

  @Column({ name: 'policy_version', type: 'int', default: 0 })
  policyVersion: number;

  @ManyToOne(() => Family, (family) => family.devices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'family_id' })
  family: Family;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
