import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空'
  })
  username?: string;

  @IsNotEmpty({
    message: '密码不能为空'
  })
  password?: string;

  // @IsNotEmpty({
  //   message: '手机号不能为空'
  // })
  @IsOptional()
  @IsMobilePhone('zh-CN', {}, {
    message: '请输入正确的手机号'
  })
  
  mobile?: string;

  // @IsNotEmpty({
  //   message: '邮箱不能为空'
  // })
  @IsOptional()
  @IsEmail({}, {
    message: '邮箱地址格式不正确'
  })
  email?: string;
}
