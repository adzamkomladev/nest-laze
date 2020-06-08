import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './services/auth.service';

import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from './guards/role.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body(ValidationPipe) body: SignUpDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  signIn(
    @Body(ValidationPipe) body: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(body);
  }

  @Post('/me')
  @UseGuards(AuthGuard())
  currentUser(@GetUser() user: User): User {
    return user;
  }
}
