import { IsNotEmpty, IsEnum } from "class-validator";
import { ResourceType } from "src/common/enums";

export class ResourceDto {
  //自身信息
  @IsNotEmpty({message:'资源类型不能为空'})
  @IsEnum(ResourceType,{
    message:'资源类型值错误'
  })
  type:ResourceType;
  
  name:string;

  @IsNotEmpty()
  title:string;
  
  icon?:string;

  iconColor?:string;

  path?:string;

  method?:string;

  isEnd?:number;

  desc?:string;

  children:ResourceDto[]
}
