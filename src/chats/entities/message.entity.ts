import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
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
}
