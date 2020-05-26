import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';

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
  findAll(
    @Query(ValidationPipe) usersFilterDto: UsersFilterDto,
  ): Promise<User[]> {
    return this.authService.findAll(usersFilterDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(CurrentUserOrAdminGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storage/uploads/users',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @UploadedFile() file,
  ): Promise<void> {
    return this.authService.update(id, updateUserDto, file);
  }
}
