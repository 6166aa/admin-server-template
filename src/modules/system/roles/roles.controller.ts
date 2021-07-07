import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindAllQuery } from 'src/common/decorators/find-all-query.decorator';
import { FindManyOptions } from 'typeorm';
import { Role } from './entities/role.entity';
import { NoAuthentication } from 'src/common/decorators/no-authen.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }


  @Get()
  @NoAuthentication()
  findAll(@FindAllQuery() findParam: FindManyOptions<Role>) {
    return this.rolesService.findAll(findParam);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Get(':id/users')
  findOneWithUsers(@Param('id') id: string) {
    return this.rolesService.findOne(+id, ['users']);
  }

  @Get(':id/resources')
  findOneWithResources(@Param('id') id: string) {
    return this.rolesService.findOne(+id, ['resources']);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Put()
  @NoAuthentication()
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

  @Post(':id/users/:userId')
  @NoAuthentication()
  allocateUser(@Param('id') id: string, @Param('userId') userId: string) {
    this.rolesService.allocateUser(+id, +userId);
  }

  @Post(':id/resources')
  @NoAuthentication()
  allocateResources(@Param('id') id: string, @Body() resourceIds: number[]) {
    this.rolesService.allocateResources(+id, resourceIds);
  }

  @Delete(':id/users/:userId')
  removeUser(@Param('id') id: string, @Param('userId') userId: string) {
    this.rolesService.removeUser(+id, +userId);
  }
}
