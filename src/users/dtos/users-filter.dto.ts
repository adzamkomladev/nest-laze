import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UsersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly search?: string;
}
