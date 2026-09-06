import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Family } from './family.entity';
import { User } from '../users/user.entity';

export enum FamilyRole {
  OWNER = 'owner',
  PARENT = 'parent',
  GUARDIAN = 'guardian',
}

@Entity('family_members')
@Unique(['familyId', 'userId'])
export class FamilyMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'family_id' })
  familyId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: FamilyRole,
    default: FamilyRole.PARENT,
  })
  role: FamilyRole;

  @ManyToOne(() => Family, (family) => family.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'family_id' })
  family: Family;

  @ManyToOne(() => User, (user) => user.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
