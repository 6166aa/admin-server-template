import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column({
    unique:true
  })
  username:string;

  @Column({
    select:false
  })
  password:string;
}
