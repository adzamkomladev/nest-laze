import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProjectRepository } from '../repositories/project.repository';

import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { ProjectsFilterDto } from '../dtos/projects-filter.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectsRepository: ProjectRepository,
  ) {}

  findAll(projectsFilterDto: ProjectsFilterDto): Promise<Project[]> {
    return this.projectsRepository.filterProjects(projectsFilterDto);
  }

  async findOne(id: number): Promise<Project> {
    try {
      return await this.projectsRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(`Project with id: '${id}' not found!`);
    }
  }

  create(createProjectDto: CreateProjectDto, file?: any): Promise<Project> {
    const fileUrl = file?.path;

    return this.projectsRepository.createProject(createProjectDto, fileUrl);
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
    file?: any,
  ): Promise<void> {
    const project = await this.findOne(id);

    const { title, details } = updateProjectDto;

    project.title = title ?? project.title;
    project.details = details ?? project.details;
    project.fileUrl = file?.path ?? project.fileUrl;

    await project.save();
  }

  async delete(id: number): Promise<void> {
    const result = await this.projectsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Project with id: '${id}' not found!`);
    }
  }
}
