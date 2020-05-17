import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';

import { ProjectsService } from './services/projects.service';
import { ProjectFilesService } from './services/project-files.service';

import { Project } from './entities/project.entity';
import { ProjectFile } from './entities/project-file.entity';

import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsFilterDto } from './dtos/projects-filter.dto';

@Controller('projects')
export class ProjectsController {
  private readonly logger: Logger;

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectFilesService: ProjectFilesService,
  ) {
    this.logger = new Logger(ProjectsController.name);
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    this.logger.log({ createProjectDto });
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() projectsFilterDto: ProjectsFilterDto): Promise<Project[]> {
    return this.projectsService.findAll(projectsFilterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<void> {
    this.logger.log({ id, updateProjectDto });

    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectsService.delete(id);
  }

  @Post(':id/upload')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
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
  uploadFiles(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files,
  ): Promise<ProjectFile[]> {
    return this.projectFilesService.bulkCreate(id, files);
  }
}
