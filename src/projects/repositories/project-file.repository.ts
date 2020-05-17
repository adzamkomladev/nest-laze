import { EntityRepository, Repository } from 'typeorm';

import { ProjectFile } from '../entities/project-file.entity';

@EntityRepository(ProjectFile)
export class ProjectFileRepository extends Repository<ProjectFile> {}
