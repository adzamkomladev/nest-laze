import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './services/auth.service';

import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body(ValidationPipe) body: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  signIn(
    @Body(ValidationPipe) body: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(body);
  }
}
