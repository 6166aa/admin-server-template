import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Resource } from "../../resources/entities/resource.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class User extends BaseEntity {
  @Column({
    unique:true,
    length:'32'
  })
  username:string;

  @Column({
    length:128,
    select:false
  })
  password:string;

  @Column({
    unique:true,
    nullable:true,
    length:'32'
  })
  mobile:string;

  @Column({
    unique:true,
    nullable:true,
    length:'32'
  })
  email:string;

  @JoinTable({
    name:'users_roles'
  })
  @ManyToMany(()=>Role,role=>role.users)
  roles:Role[];

  //虚拟字段，self用
  resources:Resource[]
  //
  test:string
}
