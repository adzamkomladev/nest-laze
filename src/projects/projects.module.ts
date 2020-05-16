import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './projects.controller';

import { ProjectsService } from './projects.service';

import { ProjectRepository } from './repositories/project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
