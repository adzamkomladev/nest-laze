import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { CurrentUserOrAdminGuard } from './guards/current-user-or-admin.guard';

import { UsersService } from './services/users.service';

import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, CurrentUserOrAdminGuard],
})
export class UsersModule {}
