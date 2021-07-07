import { Module, UseGuards, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './modules/system/system.module';
import appConfig from './configs'
import { JwtAuthGuard } from './common/guards/jwt.guard';
import { RoleAuthGuard } from './common/guards/role.guard';
import { ToolModule } from './modules/tools/tools.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: appConfig,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('orm'),
      inject: [ConfigService]
    }),
    SystemModule,ToolModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard//使用扩展的认证守卫
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleAuthGuard//使用扩展的认证守卫
    // },
  ],
})
export class AppModule { }
