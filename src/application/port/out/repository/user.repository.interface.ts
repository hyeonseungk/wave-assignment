import { Id } from '../../../../domain/entity/type';
import { User, UserCreateInput } from '../../../../domain/entity/user.entity';

export interface UserRepository {
  createOne(input: UserCreateInput): Promise<void>;
  findOneById(id: Id): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;

  /**
   * password를 다룰 일은 로그인 시를 제외하고는 없기에
   * User 엔티티에는 password 필드를 두지 않음
   * 단, 로그인 시에만 사용할 별도 메소드를 정의
   */
  findUserIdAndPasswordByEmail(
    email: string,
  ): Promise<{ userId: Id; password: string } | null>;
}
