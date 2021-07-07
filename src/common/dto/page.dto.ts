export class Page<T>{
  data: T[];
  pageInfo: pageInfo = new pageInfo()
}
class pageInfo {
  total: number;//总数
  current: number;//当前页
  size: number;//页大小
  pageTotal: number;//总共多少页
}