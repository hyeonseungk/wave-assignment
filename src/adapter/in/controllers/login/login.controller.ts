import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApplicationService } from '../../../../application/applicatioin.module';
import {
  LoginCommand,
  LoginSvc,
} from '../../../../application/port/in/login.service.interface';
import { AccessControl } from '../../../common/guards/access-guard';
import { UserLevel } from '../../../common/guards/type';
import { LoginRequestBody } from './dto/login.request.body';

@Controller('/api/v1')
@AccessControl(UserLevel.ANY)
export class LoginController {
  constructor(
    @Inject(ApplicationService.LoginSvc)
    private readonly loginService: LoginSvc,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginRequestBody) {
    const { email, password } = body;
    const command = new LoginCommand(email, password);
    return await this.loginService.login(command);
  }
}
