import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ProjectsService } from './projects.service';

import { User } from '../auth/user.entity';

@Injectable()
export class ProjectAssigneeGuard implements CanActivate {
  constructor(private readonly projectsService: ProjectsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user: User = request.user;

    const params = request.params;
    const projectId = params.id;
    const project = await this.projectsService.findOne(projectId);

    return user.id === project.assigneeId;
  }
}
