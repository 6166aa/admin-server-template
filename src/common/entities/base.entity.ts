import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity{
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column({
    type:'int',
    default:'1',
    comment:'0-不可用，1-正常，2-冻结'
  })
  status:number;

  @CreateDateColumn({
    type:'timestamp'
  })
  createAt: Date;

  @UpdateDateColumn({
    type:'timestamp'
  })

  updateAt: Date;
  
  @Column({
    type:'timestamp',
    nullable:true
  })
  deleteAt:Date;

  @Column({
    nullable:true,
    length:128
  })
  deleteBy:string
}
