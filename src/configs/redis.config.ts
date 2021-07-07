import { registerAs } from '@nestjs/config'
import { jwtConstants } from 'src/common/constants/jwt.constant';

export default registerAs('redis', () => ({
  secret: jwtConstants.privateKey,
  signOptions: { expiresIn: '1m' },
  //refreshToken比前者大就行
  refreshTokenOptions: { expiresIn: '2m' }
}));