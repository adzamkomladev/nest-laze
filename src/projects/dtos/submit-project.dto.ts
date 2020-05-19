import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitProjectDto {
  @IsNotEmpty()
  @IsString()
  readonly submitText: string;
}
