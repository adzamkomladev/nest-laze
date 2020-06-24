import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class SubmitProjectDto {
  @IsNotEmpty()
  @IsString()
  readonly submitText: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly submittedFileUrl: string;
}
