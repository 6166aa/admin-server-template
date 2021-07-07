import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from 'src/common/constants/jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService:ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.publicKey,
    });
  }

  async validate(payload: any) {
    //payload是根据header处的token来解密出来的内容
    //每个策略都需要写该方法，用于当前认证是否通过，同时返回值会放在request.user处
    return { userId: payload.userId, username: payload.username };
  }
}