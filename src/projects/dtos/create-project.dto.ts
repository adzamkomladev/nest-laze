import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly details: string;

  @IsNotEmpty()
  @IsDateString()
  readonly deadline: Date;
}
