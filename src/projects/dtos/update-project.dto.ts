import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { Status } from '../enums/status.enum';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly details?: string;

  @IsOptional()
  @IsEnum(Status)
  readonly status?: Status;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsDateString()
  readonly deadline?: Date;

  @IsOptional()
  @IsNumberString()
  readonly assigneeId?: number;
}
