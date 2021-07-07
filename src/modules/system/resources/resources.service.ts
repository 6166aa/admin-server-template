import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClass, classToPlain, plainToClass } from 'class-transformer';
import { Page } from 'src/common/dto/page.dto';
import { ResourceType } from 'src/common/enums';
import { BaseEntityService } from 'src/common/services/base-entity.service';
import { Repository, TreeRepository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService extends BaseEntityService<Resource> {
  constructor(@InjectRepository(Resource) protected readonly repo: TreeRepository<Resource>) {
    super(repo);
    this.repo = repo;
   }

  async create(createResourceDto: CreateResourceDto) {
    console.log(createResourceDto);
    if (createResourceDto.parentId && createResourceDto.type === ResourceType.resource) {
      let entity:any  = classToPlain(createResourceDto);
      let parent = await this.repo.findOne(createResourceDto.parentId);
      entity.parent = parent;
      let result = await this.repo.save(entity);
      parent.isEnd = 1;
      await this.repo.save(parent);
      return result;
    } else {
      return this.repo.save(createResourceDto);
    }
  }

  async findAllTree():Promise<Resource[]>{
    return this.repo.findTrees();
  }

}
