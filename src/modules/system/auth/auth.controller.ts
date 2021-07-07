import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { NoAuthentication } from 'src/common/decorators/no-authen.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  // @Post('login')
  // @NoAuthentication()
  // async login(@Body() loginDto:LoginDto): Promise<any> {
  //   return this.authService.login(loginDto);
  // }
  
  @Get('self')
  async self(@Req() req): Promise<any> {
    return req.user;
  }

  // @Get('self/resources')
  // @HttpCode(200)
  // async selfWithResources(@Req() req): Promise<any> {
  //   return this.authService.getResources(req.user);
  // }

  @Post('refresh')
  @NoAuthentication()
  async getNewToken(@Body('refreshToken') refreshToken:string){
    return this.authService.getNewToken(refreshToken);
  }

  @Post('test')
  @NoAuthentication()
  async test(@Body() testDto){
   return testDto;
  }
}
