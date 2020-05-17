import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProjectFileRepository } from '../repositories/project-file.repository';

import { ProjectFile } from '../entities/project-file.entity';

@Injectable()
export class ProjectFilesService {
  constructor(
    @InjectRepository(ProjectFileRepository)
    private readonly projectFilesRepository: ProjectFileRepository,
  ) {}

  bulkCreate(projectId: number, files: any[]): Promise<ProjectFile[]> {
    const projectFiles: ProjectFile[] = files.map(file => {
      const projectFile = new ProjectFile();

      projectFile.url = file?.path;
      projectFile.projectId = projectId;

      return projectFile;
    });

    return this.projectFilesRepository.save(projectFiles);
  }
}
