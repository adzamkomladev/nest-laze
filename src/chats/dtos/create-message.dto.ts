import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsInt()
  readonly chatId: number;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsInt()
  readonly senderId: number;
}
