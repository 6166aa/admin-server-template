import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFindAllDto } from 'src/common/dto/all-query.dto';
import { Page } from 'src/common/dto/page.dto';
import { BaseEntityService } from 'src/common/services/base-entity.service';
import { ToolService } from 'src/common/services/tool.service';
import { Like, Not, Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ModifyPasswordDto } from './dto/modify-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseEntityService<User> {
  constructor(
    @InjectRepository(User) repo: Repository<User>,
    private readonly toolService: ToolService
  ) {
    super(repo);
  }

  async findOneByUsername(username: string, withPassword?: boolean) {
    if (withPassword !== undefined) {
      return this.repo.createQueryBuilder('user')
        .where('user.username=:username', { username })
        .addSelect('user.password')
        .getOne();
    }
    return this.repo.findOne({
      where: {
        username: username
      }
    });
  }

  async resetPassword(id: number) {
    let entity = await this.repo.findOne(id);
    if (!entity) {
      throw new BadRequestException('没有找到对应用户');
    }
    entity.password = await this.toolService.encrypt('111111');
    this.repo.save(entity);
  }

  async modifyPassword(username, modifyPasswordDto: ModifyPasswordDto) {
    let user = await this.findOneByUsername(username, true);
    if (user) {
      var isEqual = await this.toolService.verify(modifyPasswordDto.oldPassword, user.password);
      if (!isEqual) {
        throw new BadRequestException('用户或密码错误');
      }
      user.password = await this.toolService.encrypt(modifyPasswordDto.newPassword);
      this.repo.save(user);
      return;
    }
    throw new BadRequestException('用户不存在');
  }
  // 该方法主要用户获取用户信息及相关联的资源
  async getSelf(userId: number) {
    return this.repo.createQueryBuilder('user')
      .leftJoin('users_roles', 'ur', 'user.id = ur.userId')
      .leftJoinAndMapMany('user.roles', 'role', 'role', 'role.id = ur.roleId')
      .leftJoin('roles_resources', 'rr', 'role.id = rr.roleId')
      .leftJoinAndMapMany('user.resources', 'resource', 'res', 'res.id = rr.resourceId')
      .where('user.id = :id', { id: userId })
      .getOne();
    // return this.repo.findOne(userId,{
    //   relations:['roles','roles.resources','resources.children'],
    // });
  }
  async getNotAllocatedUserByRoleId(roleId: number) {
    return this.repo.createQueryBuilder("user")
      .leftJoin("user.roles",'role')
      // .leftJoinAndMapMany('user.roles','role','r','r.id = ur.roleId')
      .where('role.id != :id', { id: roleId })
      .orWhere('role.id IS NULL')
      .getMany()
  }
}
