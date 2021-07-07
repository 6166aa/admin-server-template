import { registerAs } from '@nestjs/config'
import { jwtConstants } from 'src/common/constants/jwt.constant';

export default registerAs('jwt', () => ({
  secret: jwtConstants.privateKey,
  signOptions: { expiresIn: '.45h' },
  //refreshToken比前者大就行
  refreshTokenOptions: { expiresIn: '1h' }
}));