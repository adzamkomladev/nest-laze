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
import { CurrentUserOrAdminGuard } from './current-user-or-admin.guard';

import { UsersService } from './users.service';

import { User } from '../auth/user.entity';

import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersFilterDto } from './dtos/users-filter.dto';

@Controller('users')
@UseGuards(AuthGuard(), RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query(ValidationPipe) query: UsersFilterDto): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  @UseGuards(CurrentUserOrAdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.update(id, body);
  }
}
