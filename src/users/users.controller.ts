import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../auth/services/auth.service';

import { User } from '../auth/entities/user.entity';

import { ProjectsFilterDto } from '../projects/dtos/projects-filter.dto';
import { Project } from '../projects/entities/project.entity';

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

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.authService.findOne(id);
  }
}
