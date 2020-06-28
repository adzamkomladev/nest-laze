import { IsInt, IsNotEmpty } from 'class-validator';

export class RoomDto {
  @IsNotEmpty()
  @IsInt()
  readonly chatId: number;
}
