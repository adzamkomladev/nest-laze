import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { CurrentUserOrAdminGuard } from './guards/current-user-or-admin.guard';

import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [CurrentUserOrAdminGuard],
})
export class UsersModule {}
