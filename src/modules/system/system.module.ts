import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, RolesModule, ResourcesModule, AuthModule],
})
export class SystemModule {}
