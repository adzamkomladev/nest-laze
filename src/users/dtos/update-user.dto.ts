import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { Role } from '../../auth/enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsBoolean()
  readonly approved?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly fullName?: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly careerDetails?: string;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  readonly telephone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  readonly email?: string;

  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly profileImageUrl?: string;
}
