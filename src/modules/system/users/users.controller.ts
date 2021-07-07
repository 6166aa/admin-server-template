import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { NoAuthentication } from 'src/common/decorators/no-authen.decorator';
import { EncryptPwdPipe } from 'src/common/pipes/encrypt-pwd.pipe';
import { BaseFindAllDto } from 'src/common/dto/all-query.dto';
import { FindAllQuery } from 'src/common/decorators/find-all-query.decorator';
import { ModifyPasswordDto } from './dto/modify-password.dto';
import { FindManyOptions } from 'typeorm';
import { classToClass, serialize } from 'class-transformer';
import { get } from 'http';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @NoAuthentication()
  create(@Body(EncryptPwdPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@FindAllQuery() findParam: FindManyOptions<User>) {
    return this.usersService.findAll(findParam);
  }
  @Get('notAllocatedUsers/:roleId')
  findNotAllocatedUser(@Param('id') roleId:number){
    return this.usersService.getNotAllocatedUserByRoleId(roleId);
  }
//   @Get(":id")
//  async findOne(@Body('id') id:number) {
//     return this.usersService.findOne(id);
//   }

//   @Patch(':id')
//   @HttpCode(204)
//   update(@Param('id') id: string, @Body(EncryptPwdPipe) updateUserDto: UpdateUserDto) {
//     return this.usersService.update(+id, updateUserDto);
//   }

//   @Delete(':id')
//   @HttpCode(204)
//   remove(@Param('id') id: string) {
//     return this.usersService.remove(+id);
//   }

//   @Post(':id/actions/resetPassword')
//   @HttpCode(204)
//   resetPassword(@Param('id') id: string) {
//     return this.usersService.resetPassword(+id);
//   }

//   @Post('self/actions/modifyPassword')
//   @HttpCode(204)
//   modifyPassword(@Req() req, @Body() modifyPasswordDto: ModifyPasswordDto) {
//     return this.usersService.modifyPassword(req.user.username, modifyPasswordDto)
//   }
}
