import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { FamilyMember } from './family-member.entity';
import { Device } from '../devices/device.entity';

@Entity('families')
export class Family {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'owner_user_id' })
  ownerUserId: string;

  @ManyToOne(() => User, (user) => user.ownedFamilies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_user_id' })
  owner: User;

  @OneToMany(() => FamilyMember, (member) => member.family)
  members: FamilyMember[];

  @OneToMany(() => Device, (device) => device.family)
  devices: Device[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
