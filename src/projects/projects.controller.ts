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

import { ProjectsService } from './services/projects.service';

import { Project } from './entities/project.entity';
import { User } from '../auth/entities/user.entity';

import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsFilterDto } from './dtos/projects-filter.dto';
import { SubmitProjectDto } from './dtos/submit-project.dto';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { ProjectAssigneeGuard } from './guards/project-assignee.guard';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectsController {
  private readonly logger: Logger;

  constructor(private readonly projectsService: ProjectsService) {
    this.logger = new Logger(ProjectsController.name);
  }

  @Post()
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
    @Body(ValidationPipe) createProjectDto: CreateProjectDto,
    @UploadedFile() file,
    @GetUser() user: User,
  ): Promise<Project> {
    this.logger.log({ createProjectDto, user });
    return this.projectsService.create(createProjectDto, user, file);
  }

  @Get()
  findAll(
    @Query(ValidationPipe) projectsFilterDto: ProjectsFilterDto,
  ): Promise<Project[]> {
    return this.projectsService.findAll(projectsFilterDto);
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
    @Body(ValidationPipe) updateProjectDto: UpdateProjectDto,
    @UploadedFile() file,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.log({ id, updateProjectDto });

    return this.projectsService.update(id, updateProjectDto, file);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.projectsService.delete(id);
  }

  @Patch(':id/submit')
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
    @Body(ValidationPipe) submitProjectDto: SubmitProjectDto,
    @UploadedFile() file,
  ): Promise<void> {
    this.logger.log({ id, submitProjectDto });

    return this.projectsService.submit(id, submitProjectDto, file);
  }
}
