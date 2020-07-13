import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { CurrentUserOrAdminGuard } from './current-user-or-admin.guard';

import { UsersService } from './users.service';

import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, CurrentUserOrAdminGuard],
})
export class UsersModule {}
