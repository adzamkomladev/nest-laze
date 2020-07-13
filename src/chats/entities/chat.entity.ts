import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Message } from './message.entity';
import { User } from '../../auth/user.entity';

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userOneId: number;

  @Column()
  userTwoId: number;

  @ManyToOne(
    type => User,
    user => user.chatOne,
    { eager: false },
  )
  @JoinColumn({ name: 'userOneId' })
  userOne: User;

  @ManyToOne(
    type => User,
    user => user.chatTwo,
    { eager: false },
  )
  @JoinColumn({ name: 'userTwoId' })
  userTwo: User;

  @OneToMany(
    type => Message,
    message => message.chat,
  )
  @JoinColumn({ name: 'chatId' })
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
