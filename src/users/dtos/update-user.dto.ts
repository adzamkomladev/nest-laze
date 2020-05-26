import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

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
}
