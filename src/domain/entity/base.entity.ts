export abstract class Entity {
  constructor(private readonly id: number) {}

  getId() {
    return this.id;
  }

  abstract toDTO(): Record<string, any>;
}
