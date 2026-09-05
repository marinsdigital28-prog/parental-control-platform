import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Family } from '../families/family.entity';
import { Device } from '../devices/device.entity';

@Entity('device_pairings')
export class DevicePairing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'family_id' })
  @Index()
  familyId: string;

  @Column({ name: 'device_id', nullable: true })
  deviceId: string | null;

  @Column({ name: 'token_hash', length: 128 })
  tokenHash: string;

  @Column({ name: 'short_code', length: 12, nullable: true })
  shortCode: string | null;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @Column({ name: 'used_at', type: 'timestamptz', nullable: true })
  usedAt: Date | null;

  @Column({ name: 'created_by_user_id' })
  createdByUserId: string;

  @ManyToOne(() => Family, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'family_id' })
  family: Family;

  @ManyToOne(() => Device, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'device_id' })
  device: Device | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
