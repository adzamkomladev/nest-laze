import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private readonly projects: any[];

  constructor() {
    this.projects = [];
  }

  async findAll(): Promise<any[]> {
    return this.projects;
  }
}
