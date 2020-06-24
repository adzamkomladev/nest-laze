import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

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

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly fileUrl?: string;
}
