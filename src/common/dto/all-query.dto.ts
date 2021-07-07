
export class BaseFindAllDto {
  q?: string;//查询值，格式q=xx,xx,xx
  q_fields: string;//查询字段，与q对应，多的取第一个，少的丢失q
  fields: string;//过滤实体字段,格式fields=xx,xxx,xxxx
  offset?: number //不传全查询
  limit?: number //不传全查询
  sort?: string;//按什么排序，格式sort:name,age
  order?: string;//排序，格式order=asc,desc与sort对应，多的丢弃，少的默认asc
}