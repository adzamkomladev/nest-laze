import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

const fs = require('fs');

import { ProjectRepository } from '../repositories/project.repository';

import { Project } from '../entities/project.entity';

import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { ProjectsFilterDto } from '../dtos/projects-filter.dto';

@Injectable()
export class ProjectsService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectsRepository: ProjectRepository,
  ) {
    this.logger = new Logger(ProjectsService.name);
  }

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

    if (project.fileUrl) {
      this.removeFile(project.fileUrl);
    }

    const { title, details, status, price, deadline } = updateProjectDto;

    project.title = title ?? project.title;
    project.details = details ?? project.details;
    project.fileUrl = file?.path ?? project?.fileUrl;
    project.status = status ?? project.status;
    project.price = price ?? project?.price;
    project.deadline = deadline ?? project.deadline;

    this.logger.log(await project.save());
  }

  async delete(id: number): Promise<void> {
    const project = await this.findOne(id);

    const removedProject = await project.remove();

    if (removedProject.fileUrl) {
      this.removeFile(removedProject.fileUrl);
    }
  }

  private removeFile(filePath: string): void {
    try {
      fs.unlinkSync(`./${filePath}`);
    } catch (err) {
      this.logger.error({ err });

      throw new InternalServerErrorException('Unable to update project');
    }
  }
}
