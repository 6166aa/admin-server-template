import { registerAs } from '@nestjs/config'

export default registerAs('orm', () => ({
  type: 'mysql',
  host: 'localhost',
  port: '3306',
  database: 'adminServerDB',
  username: 'root',
  password: '123456Aa!',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
}));