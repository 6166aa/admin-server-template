import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({
    type:'int',
    default:'1',
    comment:'0-不可用，1-正常'
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
}
