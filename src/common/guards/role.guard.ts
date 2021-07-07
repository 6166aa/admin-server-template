import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }
  async canActivate(context: ExecutionContext):Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    var isNoAuthentication = this.reflector.get<string[]>('noAuthentication', context.getHandler());
    if (isNoAuthentication) {
      //跳过验证
      return true;
    }
    if(!user){
      throw new UnauthorizedException('未认证');
    }
    return Promise.resolve(true);
  }
}