import { Inject, Injectable } from '@nestjs/common';
import { OutAdapter } from '../../adapter/out/out.adapter.module';
import { ConfigManager } from '../../common/config/config-manager';
import { BadRequestError } from '../../common/error/custom-error';
import {
  LoginCommand,
  LoginResult,
  LoginSvc,
} from '../port/in/login.service.interface';
import { UserRepository } from '../port/out/repository/user.repository.interface';
import { verifyPassword } from '../util/hash';
import { generateAccessToken } from '../util/token';

const LOGIN_ERROR_MESSAGE = '로그인 정보가 정확하지 않아요.'; // 보안상 애매한 메시지 표출

@Injectable()
export class LoginService implements LoginSvc {
  constructor(
    private readonly configManager: ConfigManager,
    @Inject(OutAdapter.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async login(command: LoginCommand): Promise<LoginResult> {
    const { email, password } = command;
    const userFieldObj =
      await this.userRepository.findUserIdAndPasswordByEmail(email);
    if (!userFieldObj) {
      throw new BadRequestError(LOGIN_ERROR_MESSAGE);
    }
    const { userId, password: hashedPassword } = userFieldObj;
    const isPasswordValid = await verifyPassword(password, hashedPassword);
    if (!isPasswordValid) {
      throw new BadRequestError(LOGIN_ERROR_MESSAGE);
    }
    const { secret, expiresIn } = this.configManager.getConfig().jwt;
    const accessToken = generateAccessToken(userId, secret, expiresIn);
    return new LoginResult(accessToken);
  }
}
