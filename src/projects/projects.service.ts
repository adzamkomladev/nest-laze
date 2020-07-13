import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProjectRepository } from './project.repository';

import { Project } from './project.entity';
import { User } from '../auth/user.entity';

import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsFilterDto } from './dtos/projects-filter.dto';
import { SubmitProjectDto } from './dtos/submit-project.dto';

import { Status } from './enums/status.enum';

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
      return await this.projectsRepository.findOneOrFail(id, {
        relations: ['owner', 'assignee'],
      });
    } catch (error) {
      throw new NotFoundException(`Project with id: '${id}' not found!`);
    }
  }

  create(createProjectDto: CreateProjectDto, owner: User): Promise<Project> {
    return this.projectsRepository.createProject(createProjectDto, owner);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<void> {
    const project = await this.findOne(id);

    const {
      title,
      details,
      status,
      price,
      deadline,
      assigneeId,
      fileUrl,
    } = updateProjectDto;

    project.title = title ?? project.title;
    project.details = details ?? project.details;
    project.fileUrl = fileUrl ?? project?.fileUrl;
    project.status = status ?? project.status;
    project.price = price ?? project?.price;
    project.deadline = deadline ?? project.deadline;

    if (assigneeId) {
      project.assigneeId = assigneeId;
      project.dateAssigned = new Date();
    }

    this.logger.log(await project.save());
  }

  async delete(id: number): Promise<void> {
    const project = await this.findOne(id);

    await project.remove();
  }

  async submit(id: number, submitProjectDto: SubmitProjectDto): Promise<void> {
    const project = await this.findOne(id);

    const { submitText, submittedFileUrl } = submitProjectDto;

    project.submitText = submitText ?? project?.submitText;
    project.submittedFileUrl = submittedFileUrl ?? project?.submittedFileUrl;
    project.dateSubmitted = new Date();
    project.status = Status.SUBMITTED;

    this.logger.log(await project.save());
  }
}
