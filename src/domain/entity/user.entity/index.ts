import { Entity } from '../base.entity';
import { Id } from '../type';
import { UserGrade } from './type';

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
