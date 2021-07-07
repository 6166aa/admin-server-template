import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ToolService } from 'src/common/services/tool.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly toolService: ToolService,
    private readonly configService: ConfigService,

  ) { }

  // async login(loginDto: LoginDto): Promise<any> {
  //   const user: User = await this.usersService.getOne(loginDto.username, true);
  //   if (user) {
  //     var isEqual = await this.toolService.verify(loginDto.password, user.password);
  //     if (isEqual) {
  //       let payload: any = { username: user.username, userId: user.id };
  //       const accessToken = this.jwtService.sign(payload);
  //       payload.refresh = 'refresh';
  //       const refreshToken = this.jwtService.sign(payload, this.configService.get('jwt').refreshTokenOptions);
  //       return {
  //         accessToken,
  //         refreshToken,
  //       }
  //     }
  //     throw new BadRequestException('用户或密码错误');
  //   }
  //   throw new BadRequestException('用户不存在');
  // }
  async getNewToken(refreshToken: string) {
    try {
      //验证并获取解密后的token信息
      const Info = this.jwtService.verify(refreshToken);
      //丢弃refresh签发时间、过期时间等信息
      const { refresh, exp, iat, ...payload } = Info;
      //判断是否已经使用过
      // if(refresh ==='has used'){
      //   throw new BadRequestException('refreshToken已经使用过');
      // }
      const accessToken = this.jwtService.sign(payload);
      payload.refresh = 'refresh';
      refreshToken = this.jwtService.sign(payload, this.configService.get('jwt').refreshTokenOptions);
      return {
        accessToken,
        refreshToken,
      }
    } catch (error) {
      console.log(error.message);
      if (error.message === 'jwt malformed') {
        // jwt格式错误
        throw new BadRequestException('refreshToken格式错误');
      }
      else if (error.message === 'jwt expired') {
        //验证不通过
        throw new ForbiddenException('refreshToken已经失效');
      }
      else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  // async getResources(userInfo){
  //   return this.usersService.getSelf(userInfo.userId);
  // }
}