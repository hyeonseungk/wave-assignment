import { Entity } from '../base.entity';
import { Id } from '../type';
import { UserGrade } from './type';

/**
 * TODO. 각 필드를 Value Object로 변경하고
 * 각 값에 대한 유효성 검증 책임을 할당할 수도 있지만
 * 코드의 복잡도 상승을 감수하면서 그렇게까지 할 것인지 논의 필요
 */
export class User extends Entity {
  constructor(
    id: Id,
    private readonly email: string,
    private readonly nickname: string,
    private readonly grade: UserGrade,
  ) {
    super(id);
  }

  toDTO() {
    return {
      id: this.getId(),
      email: this.email,
      nickname: this.nickname,
      grade: this.grade,
    };
  }
}

export type UserCreateInput = {
  email: string;
  nickname: string;
  grade: UserGrade;
};
