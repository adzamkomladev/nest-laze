import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';

import { Project } from './entities/project.entity';

import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsFilterDto } from './dtos/projects-filter.dto';

@Controller('projects')
export class ProjectsController {
  private readonly logger: Logger;

  constructor(private readonly projectsService: ProjectsService) {
    this.logger = new Logger(ProjectsController.name);
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    this.logger.log({ createProjectDto });
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() projectsFilterDto: ProjectsFilterDto): Promise<Project[]> {
    return this.projectsService.findAll(projectsFilterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<void> {
    this.logger.log({ id, updateProjectDto });

    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectsService.delete(id);
  }
}
