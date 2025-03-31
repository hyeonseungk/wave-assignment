import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator<string>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // AccessGuard에서 설정한 userId를 가져옴
    const user = request.user;
    if (user) {
      return user.id;
    } else {
      return null;
    }
  },
);
