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
import { User } from '../../auth/user.entity';
import { Chat } from './chat.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;

  @Column()
  chatId: number;

  @ManyToOne(
    type => Chat,
    chat => chat.messages,
    { eager: false },
  )
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @Column('text')
  text: string;

  @Column({ default: false })
  seen: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
