import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { NoAuthentication } from 'src/common/decorators/no-authen.decorator';
import { FindAllQuery } from 'src/common/decorators/find-all-query.decorator';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @NoAuthentication()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  @NoAuthentication()
  findAll(@FindAllQuery() findParam:any) {
    return this.resourcesService.findAll(findParam);
  }
  @Get('/tree')
  @NoAuthentication()
  findAllTree() {
    return this.resourcesService.findAllTree();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  @NoAuthentication()
  updateById(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(+id, updateResourceDto);
  }
  @Put()
  @NoAuthentication()
  update(@Body() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(updateResourceDto);
  }

  @Delete(':id')
  @NoAuthentication()
  remove(@Param('id') id: number) {
    return this.resourcesService.remove(id);
  }
}
