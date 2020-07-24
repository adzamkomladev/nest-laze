import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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

    const updateData: Partial<Project> = {
      title: title ?? project.title,
      details: details ?? project.details,
      fileUrl: fileUrl ?? project?.fileUrl,
      status: status ?? project.status,
      price: price ?? project?.price,
      deadline: deadline ?? project.deadline,
    };

    if (assigneeId) {
      updateData.assigneeId = assigneeId;
      updateData.dateAssigned = new Date();
    }

    try {
      const results = await this.projectsRepository.update(id, updateData);

      if (results.affected === 0) {
        this.logger.error('Failed to update project!');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to update project!');
    }
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
