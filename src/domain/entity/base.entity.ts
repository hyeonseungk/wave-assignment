import { Id } from './type';

export abstract class Entity {
  constructor(private readonly id: Id) {}

  getId() {
    return this.id;
  }

  abstract toDTO(): Record<string, any>;
}
