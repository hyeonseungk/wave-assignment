import { UserRepository } from '../../../../application/port/out/repository/user.repository.interface';
import { Id } from '../../../../domain/entity/type';
import { User, UserCreateInput } from '../../../../domain/entity/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from './user.mapper';

export class UserRepositoryMysql implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {}

  async createOne(input: UserCreateInput): Promise<void> {
    const { email, nickname, grade } = input;
    await this.prisma.user.create({
      data: {
        email,
        nickname,
        grade,
      },
    });
  }

  async getOneById(id: Id): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.mapper.mapRawToEntity(user) : null;
  }
}
