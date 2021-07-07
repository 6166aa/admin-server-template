import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Resource } from "../../resources/entities/resource.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Role extends BaseEntity {

  @Column({
    unique:true,
    length:'32'
  })
  name:string;

  @Column({
    nullable:true
  })
  desc?:string;

  @ManyToMany(()=>User,user=>user.roles)
  users:User[]

  @JoinTable({
    name:'roles_resources'
  })
  @ManyToMany(()=>Resource,resource=>resource.roles)
  resources:Resource[]
}
