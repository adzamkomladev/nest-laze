import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProjectRepository } from './repositories/project.repository';

import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectsRepository: ProjectRepository,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    try {
      return await this.projectsRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(`Project with id: '${id}' not found!`);
    }
  }
}
