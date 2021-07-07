import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    //反射获取不需要认证的标识
    var isNoAuthentication = this.reflector.get<string[]>('noAuthentication', context.getHandler());
    console.log(context.switchToHttp().getRequest());
    if (isNoAuthentication) {
      //跳过验证
      return true;
    }
    return super.canActivate(context);//此处验证token
  }

  handleRequest(err, user, info) {
    // 可以抛出一个基于info或者err参数的异常
    // 未授权和登录信息失效
    if (info.message === 'jwt expired') {
      throw new ForbiddenException('登录信息已经失效');
    }
    if (err || !user) {
      throw err || new UnauthorizedException('未授权');
    }
    return user;
  }
}