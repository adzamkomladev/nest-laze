import { EntityRepository, Repository } from 'typeorm';

import { Project } from '../entities/project.entity';

import { CreateProjectDto } from '../dtos/create-project.dto';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { title, details } = createProjectDto;

    const project = this.create();

    project.title = title;
    project.details = details;

    return project.save();
  }
}
