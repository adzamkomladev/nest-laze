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
import { Chat } from '../../chats/entities/chat.entity';

import { Role } from '../enums/role.enum';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
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

  @Column({ nullable: true })
  fullName?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  careerDetails?: string;

  @Column({ length: 13, nullable: true })
  telephone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @OneToMany(
    type => Chat,
    chat => chat.userOne,
  )
  @JoinColumn({ name: 'userOneId' })
  chatOne: Chat[];

  @OneToMany(
    type => Chat,
    chat => chat.userTwo,
  )
  @JoinColumn({ name: 'userTwoId' })
  chatTwo: Chat[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
