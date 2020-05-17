import { EntityRepository, Repository } from 'typeorm';

import { Project } from '../entities/project.entity';

import { CreateProjectDto } from '../dtos/create-project.dto';
import { ProjectsFilterDto } from '../dtos/projects-filter.dto';

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

    return query
      .leftJoinAndSelect('project.projectFiles', 'projectFile')
      .getMany();
  }

  createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { title, details } = createProjectDto;

    const project = this.create();

    project.title = title;
    project.details = details;

    return project.save();
  }
}
