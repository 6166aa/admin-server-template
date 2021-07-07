import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/dto/page.dto';
import { BaseEntityService } from 'src/common/services/base-entity.service';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService extends BaseEntityService<Role>{
  constructor(@InjectRepository(Role) repo: Repository<Role>) {
    super(repo);
  }

  async allocateUser(id, userId) {
    await this.repo.createQueryBuilder('role')
      .relation('users')
      .of(id)
      .add(userId);
  }

  async removeUser(id, userId) {
    await this.repo.createQueryBuilder('role')
      .relation('users')
      .of(id)
      .remove(userId);
  }

  async getResourcesByRoles(role: number[]) {
    return this.repo.findByIds(role, {
      relations: ['resources']
    });
  }
  
  async allocateResources(id, roleIds) {
    await this.repo.createQueryBuilder('role')
      .relation('resources')
      .of(id)
      .add(roleIds);
  }
}
