import { IsEnum, IsNotEmpty } from 'class-validator';

import { AuthCredentialsDto } from './auth-credentials.dto';

import { Role } from '../enums/role.enum';

export class SignUpDto extends AuthCredentialsDto {
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}
