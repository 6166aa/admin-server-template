import { IsNotEmpty } from "class-validator";
import { User } from "../../users/entities/user.entity";

export class CreateRoleDto {
  @IsNotEmpty({
    message: '角色名不能为空'
  })
  name: string;

  status?: number;

  desc?: string;

  users?: User[] = [];
}