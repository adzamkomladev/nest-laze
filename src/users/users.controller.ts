import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../auth/services/auth.service';

import { User } from '../auth/entities/user.entity';

import { ProjectsFilterDto } from '../projects/dtos/projects-filter.dto';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(
    @Query(ValidationPipe) usersFilterDto: ProjectsFilterDto,
  ): Promise<User[]> {
    return this.authService.findAll(usersFilterDto);
  }
}
