import { User } from '../../../../domain/entity/user.entity';
import { UserGrade } from '../../../../domain/entity/user.entity/type';
import { Mapper } from '../prisma/mapper.interface';
import { UserRaw } from '../prisma/prisma.raw.type';

export class UserMapper implements Mapper<UserRaw, User> {
  mapRawToEntity(raw: UserRaw) {
    const { id, email, nickname, grade } = raw;
    return new User(id, email, nickname, grade as UserGrade);
  }
}
