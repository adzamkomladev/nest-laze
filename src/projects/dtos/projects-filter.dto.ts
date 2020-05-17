import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly search?: string;
}
