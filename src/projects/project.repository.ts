import { EntityRepository, Repository } from 'typeorm';

import { Project } from './project.entity';
import { User } from '../auth/user.entity';

import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsFilterDto } from './dtos/projects-filter.dto';

import { Status } from './enums/status.enum';
import { UpdateProjectDto } from './dtos/update-project.dto';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  filterProjects(projectsFilterDto: ProjectsFilterDto): Promise<Project[]> {
    const { search } = projectsFilterDto;

    const query = this.createQueryBuilder('project')
      .leftJoinAndSelect('project.owner', 'owner')
      .leftJoinAndSelect('project.assignee', 'assignee');

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
    owner: User,
  ): Promise<Project> {
    const { title, details, deadline, fileUrl } = createProjectDto;

    const project = this.create();

    project.title = title;
    project.details = details;
    project.fileUrl = fileUrl;
    project.status = Status.INITIATED;
    project.ownerId = owner.id;
    project.deadline = deadline;

    return project.save();
  }

  // updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<void> {
  //   const query = this.updat();
  // }
}
