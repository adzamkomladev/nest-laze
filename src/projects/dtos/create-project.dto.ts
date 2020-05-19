import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly details: string;

  @IsNotEmpty()
  @IsDate()
  readonly deadline: Date;
}
