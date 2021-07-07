import { InjectRepository } from "@nestjs/typeorm";
import { classToClass, classToPlain, serialize } from "class-transformer";
import { DeepPartial, FindManyOptions, Repository, TreeRepository } from "typeorm";
import { Page } from "../dto/page.dto";
import { BaseEntity } from "../entities/base.entity";

export class BaseEntityService<TEntity extends BaseEntity>{
  protected readonly repo: Repository<TEntity> | TreeRepository<TEntity>;

  constructor(repo: Repository<TEntity> | TreeRepository<TEntity>) {
    this.repo = repo;
  }

  async create(dto: DeepPartial<TEntity>): Promise<TEntity> {
    return this.repo.save(dto);
  }

  async findAll(findParam: FindManyOptions<TEntity>): Promise<TEntity[] | Page<TEntity>> {
    if (findParam.skip === undefined || findParam.skip === undefined) {
      return this.repo.find(findParam);
    }
    let result = new Page<TEntity>();
    [result.data, result.pageInfo.total] = await this.repo.findAndCount(findParam);
    result.pageInfo.size = +findParam.take;
    result.pageInfo.current = (findParam.skip / findParam.take) + 1;
    result.pageInfo.pageTotal = Math.ceil(result.pageInfo.total / result.pageInfo.size);
    return result;
  }

  async findOne(id: number, relations?: string[]) {
    return this.repo.findOne(id, { relations });
  }

  async update(entity: DeepPartial<TEntity>): Promise<void>;
  async update(id: number, entity: DeepPartial<TEntity>): Promise<void>;
  async update(idOrEntity: number | DeepPartial<TEntity>, entity?: DeepPartial<TEntity>): Promise<void> {
    let result: any;
    if (typeof idOrEntity === 'number') {
      result = await this.repo.findOne(idOrEntity);
    } else {
      result = await this.repo.findOne(idOrEntity.id as number);
      entity = idOrEntity;
    }
    Object.assign(result, entity);
    this.repo.save(result);
  }

  async remove(id: number): Promise<TEntity> {
    var deleteEntity = await this.repo.findOne(id);
    var result = await this.repo.remove(deleteEntity);
    return await deleteEntity;
  }
}