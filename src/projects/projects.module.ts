import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './projects.controller';

import { ProjectsService } from './services/projects.service';
import { ProjectFilesService } from './services/project-files.service';

import { ProjectRepository } from './repositories/project.repository';
import { ProjectFileRepository } from './repositories/project-file.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRepository, ProjectFileRepository]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectFilesService],
})
export class ProjectsModule {}
