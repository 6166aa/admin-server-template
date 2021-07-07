import { BaseEntity } from "src/common/entities/base.entity";
import { ResourceType } from "src/common/enums";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Role } from "../../roles/entities/role.entity";
@Entity()
@Tree("closure-table")
export class Resource extends BaseEntity {

  @Column({
    type: 'int',
    comment: '0-菜单，1-资源'
  })
  type: ResourceType;

  @Column({
    length: 128,
    nullable:true
  })
  name?: string;

  @Column({
    length: 256
  })
  title: string;

  @Column({
    length: 64,
    comment: '菜单图标',
    nullable: true
  })
  icon?: string;

  @Column({
    length: 20,
    comment: '菜单图标颜色值（HEX）',
    nullable: true
  })
  iconColor?: string;

  @Column({
    length: 256,
    comment: '资源路径/菜单Vue模板路径',
    nullable: true
  })
  path?: string;

  @Column({
    length: 256,
    comment: '菜单路由',
    nullable: true
  })
  route?: string;

  @Column({
    length: 20,
    comment: 'all-资源所有权限，get-查询，put/patch-修改，post-添加，delete-删除',
    nullable: true
  })
  method?: string;

  @Column({
    type: 'int',
    nullable: true,
    comment: '用于判断下级是否全是资源'
  })
  isEnd?: number;

  @Column({
    nullable:false,
    default:0,
    comment:'排序阈值，越小越靠前'
  })
  sortIndex:number;

  @Column({
    nullable: true
  })
  desc: string;


  @ManyToMany(() => Role, role => role.resources)
  roles: Role[];

  @Column({
    nullable:true
  })
  parentId?:number;

  @TreeParent()
  parent?: Resource;

  @TreeChildren({
    cascade:true
  })
  children?: Resource[];

}
