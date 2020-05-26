import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storage/uploads/projects',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          // Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body(ValidationPipe) body: CreateProjectDto,
    @UploadedFile() file,
    @GetUser() user: User,
  ): Promise<Project> {
    this.logger.log({ body, user });
    return this.projectsService.create(body, user, file);
  }

  @Get()
  findAll(@Query(ValidationPipe) query: ProjectsFilterDto): Promise<Project[]> {
    return this.projectsService.findAll(query);
  }

  @Get('project-files/:fileUrl')
  findProjectFile(
    @Res() res: Response,
    @Param('fileUrl') url: string,
    @GetUser() user: User,
  ) {
    return res.sendFile(url, { root: './storage/uploads/projects' });
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storage/uploads/projects',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateProjectDto,
    @UploadedFile() file,
  ): Promise<void> {
    this.logger.log({ id, body });

    return this.projectsService.update(id, body, file);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectsService.delete(id);
  }

  @Patch(':id/submit')
  @Roles(Role.SERVICE_PROVIDER)
  @UseGuards(ProjectAssigneeGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storage/uploads/projects',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  submit(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: SubmitProjectDto,
    @UploadedFile() file,
  ): Promise<void> {
    this.logger.log({ id, body });

    return this.projectsService.submit(id, body, file);
  }
}
