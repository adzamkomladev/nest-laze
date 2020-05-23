import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { Project } from '../../projects/entities/project.entity';
import { Role } from '../enums/role.enum';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({ default: false })
  approved: boolean;

  @OneToMany(
    type => Project,
    project => project.owner,
  )
  @JoinColumn({ name: 'ownerId' })
  projectsOwned: Project[];

  @OneToMany(
    type => Project,
    project => project.assignee,
  )
  @JoinColumn({ name: 'assigneeId' })
  projectsAssigned: Project[];

  @Column()
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
