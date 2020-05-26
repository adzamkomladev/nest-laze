import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';

import { Status } from '../enums/status.enum';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  details: string;

  @Column({ nullable: true })
  fileUrl?: string;

  @Column()
  status: Status;

  @Column({ nullable: true })
  price?: number;

  @Column()
  deadline: Date;

  @Column('text', { nullable: true })
  submitText?: string;

  @Column({ nullable: true })
  submittedFileUrl?: string;

  @Column({ nullable: true })
  dateSubmitted?: Date;

  @Column()
  ownerId: number;

  @ManyToOne(
    type => User,
    user => user.projectsOwned,
    { eager: false },
  )
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: true })
  assigneeId?: number;

  @ManyToOne(
    type => User,
    user => user.projectsAssigned,
    { eager: false },
  )
  @JoinColumn({ name: 'assigneeId' })
  assignee?: User;

  @Column({ nullable: true })
  dateAssigned?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
