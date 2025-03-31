import { Entity } from '../base.entity';
import { Id } from '../type';

export class Voice extends Entity {
  constructor(
    id: Id,
    private readonly name: string,
    private readonly explanation: string,
    private readonly link: string,
  ) {
    super(id);
  }

  toDTO() {
    return {
      id: this.getId(),
      name: this.name,
      explanation: this.explanation,
      link: this.link,
    };
  }
}
