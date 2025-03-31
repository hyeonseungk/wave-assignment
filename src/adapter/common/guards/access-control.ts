import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt from 'jsonwebtoken';
import { CustomLogger } from '../../../application/port/out/custom-logger';
import { ConfigManager } from '../../../common/config/config-manager';
import { RequestContextService } from '../context/request-context.service';
import { Logger } from '../logger/logger.module';
import { UserLevel } from './type';

const keyword = 'userLevel';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    private readonly configManager: ConfigManager,
    private readonly requestContextService: RequestContextService,
    @Inject(Logger)
    private readonly logger: CustomLogger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessLevels = this.reflector.getAllAndMerge<string[]>(keyword, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (accessLevels.length === 0) {
      throw new Error(
        `컨트롤러에 AccessControl이 설정되어 있지 않습니다. 설정해주세요!`,
      );
    }
    if (accessLevels.includes(UserLevel.ANY)) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authString = request.headers.authorization;
    const jwtString = authString.split('Bearer ')[1];
    const jwtSecret = this.configManager.getConfig().jwt.secret;
    const payload = jwt.verify(jwtString, jwtSecret) as jwt.JwtPayload;
    const userId = payload.userId;
    this.requestContextService.setUserId(userId);
    // TODO. userId 필드가 존재하는지 확인
    return true;
  }
}

export const AccessControl = (...roles: string[]) =>
  SetMetadata(keyword, roles);
