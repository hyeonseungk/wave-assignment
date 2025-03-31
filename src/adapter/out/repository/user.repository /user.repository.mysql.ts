import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../application/port/out/repository/user.repository.interface';
import { Id } from '../../../../domain/entity/type';
import { User, UserCreateInput } from '../../../../domain/entity/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepositoryMysql implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {}

  async createOne(input: UserCreateInput): Promise<void> {
    const { email, password, nickname, grade } = input;
    await this.prisma.user.create({
      data: {
        email,
        password,
        nickname,
        grade,
      },
    });
  }

  async findOneById(id: Id): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.mapper.mapRawToEntity(user) : null;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.mapper.mapRawToEntity(user) : null;
  }

  async findUserIdAndPasswordByEmail(
    email: string,
  ): Promise<{ userId: Id; password: string } | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? { userId: user.id, password: user.password } : null;
  }
}
