import { EntityRepository, Repository } from 'typeorm';

import { Project } from '../entities/project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {}
