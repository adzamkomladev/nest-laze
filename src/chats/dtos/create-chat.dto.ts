import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsInt()
  readonly userTwoId: number;
}
