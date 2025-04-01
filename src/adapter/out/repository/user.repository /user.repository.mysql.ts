import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../application/port/out/repository/user.repository.interface';
import { Id } from '../../../../domain/entity/type';
import { User, UserCreateInput } from '../../../../domain/entity/user.entity';
import { RequestContextService } from '../../../common/context/request-context.service';
import { PrismaService } from '../prisma/prisma.service';
import { RepositoryMySql } from '../prisma/repository.mysql';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepositoryMysql
  extends RepositoryMySql
  implements UserRepository
{
  constructor(
    prisma: PrismaService,
    requestContextService: RequestContextService,
    private readonly mapper: UserMapper,
  ) {
    super(prisma, requestContextService);
  }

  async createOne(input: UserCreateInput): Promise<User> {
    const { email, password, nickname, grade } = input;
    const newOne = await this.db().user.create({
      data: {
        email,
        password,
        nickname,
        grade,
      },
    });
    return this.mapper.mapRawToEntity(newOne);
  }

  async findOneById(id: Id): Promise<User> {
    const user = await this.db().user.findUnique({
      where: { id },
    });
    return user ? this.mapper.mapRawToEntity(user) : null;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.db().user.findUnique({
      where: { email },
    });
    return user ? this.mapper.mapRawToEntity(user) : null;
  }

  async findUserIdAndPasswordByEmail(
    email: string,
  ): Promise<{ userId: Id; password: string } | null> {
    const user = await this.db().user.findUnique({
      where: { email },
    });
    return user ? { userId: user.id, password: user.password } : null;
  }
}
