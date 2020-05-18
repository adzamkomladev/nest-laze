import { EntityRepository, Repository } from 'typeorm';

import { Project } from '../entities/project.entity';

import { CreateProjectDto } from '../dtos/create-project.dto';
import { ProjectsFilterDto } from '../dtos/projects-filter.dto';

import { Status } from '../enums/status.enum';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  filterProjects(projectsFilterDto: ProjectsFilterDto): Promise<Project[]> {
    const { search } = projectsFilterDto;

    const query = this.createQueryBuilder('project');

    if (search) {
      query.andWhere(
        'project.title LIKE :search OR project.details LIKE :search',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }

  createProject(
    createProjectDto: CreateProjectDto,
    fileUrl?: string,
  ): Promise<Project> {
    const { title, details } = createProjectDto;

    const project = this.create();

    project.title = title;
    project.details = details;
    project.fileUrl = fileUrl;
    project.status = Status.INITIATED;

    return project.save();
  }
}
