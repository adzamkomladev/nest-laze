import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly details: string;

  @IsNotEmpty()
  @IsDateString()
  readonly deadline: Date;
}
