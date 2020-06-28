import { IsInt, IsNotEmpty } from 'class-validator';

export class MessageSeenDto {
  @IsNotEmpty()
  @IsInt()
  readonly messageId: number;
}
