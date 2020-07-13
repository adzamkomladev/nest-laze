import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { ProjectAssigneeGuard } from './project-assignee.guard';

import { ProjectsController } from './projects.controller';

import { ProjectsService } from './projects.service';

import { ProjectRepository } from './project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository]), AuthModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectAssigneeGuard],
})
export class ProjectsModule {}
