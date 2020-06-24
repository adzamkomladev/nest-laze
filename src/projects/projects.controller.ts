import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProjectAssigneeGuard } from './guards/project-assignee.guard';
import { RoleGuard } from '../auth/guards/role.guard';

import { ProjectsService } from './services/projects.service';

import { Project } from './entities/project.entity';
import { User } from '../auth/entities/user.entity';

import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsFilterDto } from './dtos/projects-filter.dto';
import { SubmitProjectDto } from './dtos/submit-project.dto';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from '../auth/enums/role.enum';

@Controller('projects')
@UseGuards(AuthGuard(), RoleGuard)
export class ProjectsController {
  private readonly logger: Logger;

  constructor(private readonly projectsService: ProjectsService) {
    this.logger = new Logger(ProjectsController.name);
  }

  @Post()
  @Roles(Role.STUDENT)
  create(
    @Body(ValidationPipe) body: CreateProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    this.logger.log({ body, user });
    return this.projectsService.create(body, user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query(ValidationPipe) query: ProjectsFilterDto): Promise<Project[]> {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateProjectDto,
  ): Promise<void> {
    this.logger.log({ id, body });

    return this.projectsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.ADMIN)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectsService.delete(id);
  }

  @Patch(':id/submit')
  @HttpCode(204)
  @Roles(Role.SERVICE_PROVIDER)
  @UseGuards(ProjectAssigneeGuard)
  submit(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: SubmitProjectDto,
  ): Promise<void> {
    this.logger.log({ id, body });

    return this.projectsService.submit(id, body);
  }
}
