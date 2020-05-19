import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Status } from '../enums/status.enum';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  details: string;

  @Column({ nullable: true })
  fileUrl?: string;

  @Column()
  status: Status;

  @Column({ nullable: true })
  price?: number;

  @Column()
  deadline: Date;

  @Column({ nullable: true })
  submitText?: string;

  @Column({ nullable: true })
  submittedFileUrl?: string;

  @Column({ nullable: true })
  dateSubmitted?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
