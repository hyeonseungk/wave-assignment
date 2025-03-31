import { Id } from '../../../../domain/entity/type';
import { User, UserCreateInput } from '../../../../domain/entity/user.entity';

export interface UserRepository {
  createOne(input: UserCreateInput): Promise<void>;
  getOneById(id: Id): Promise<User | null>;
}
