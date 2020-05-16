import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ProjectsService } from './projects.service';

import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }
}
