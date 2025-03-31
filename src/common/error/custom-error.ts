export class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }

  get name() {
    return this.constructor.name;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
