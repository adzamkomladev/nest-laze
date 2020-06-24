import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleGuard } from '../auth/guards/role.guard';
import { CurrentUserOrAdminGuard } from './guards/current-user-or-admin.guard';

import { AuthService } from '../auth/services/auth.service';

import { User } from '../auth/entities/user.entity';

import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersFilterDto } from './dtos/users-filter.dto';

@Controller('users')
@UseGuards(AuthGuard(), RoleGuard)
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query(ValidationPipe) query: UsersFilterDto): Promise<User[]> {
    return this.authService.findAll(query);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  @UseGuards(CurrentUserOrAdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateUserDto,
  ): Promise<void> {
    return this.authService.update(id, body);
  }
}
