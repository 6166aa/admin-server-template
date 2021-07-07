import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Like } from 'typeorm';
import { BaseFindAllDto } from '../dto/all-query.dto';

export const FindAllQuery = createParamDecorator(
  (entity: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    //进行转换
    let queryDto: BaseFindAllDto = new BaseFindAllDto();
    Object.assign(queryDto, request.query);
    let findParam: any = {};
    if (queryDto.limit !== undefined) {
      findParam.take = queryDto.limit;
    }
    if (queryDto.offset !== undefined) {
      findParam.skip = queryDto.offset;
    }
    if (queryDto.q !== undefined && queryDto.q_fields) {
      let fields = queryDto.q_fields.split(',');
      let values = queryDto.q.split(',');
      findParam.where = {};
      fields.forEach((field, i) => {
        let value = values[i] || values[0] || '';
        findParam.where[field] = Like(`%${value}%`);
      });
    }
    if (queryDto.fields) {
      findParam.select = queryDto.fields.split(',');
    }
    if (queryDto.sort && queryDto.order) {
      let sorts = queryDto.sort.split(',');
      let order = queryDto.order.split(',');
      findParam.order = {};
      sorts.forEach((sort, i) => {
        let value = order[i] || order[0] || 'asc';
        findParam.order[sort] = value;
      });
    }
    return findParam;
  },
);