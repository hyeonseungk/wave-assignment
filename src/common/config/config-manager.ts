import { Injectable } from '@nestjs/common';
import { Config, Env } from './type';

@Injectable()
export class ConfigManager {
  private config: Config = {};
  private env: Env;
  constructor() {
    this.env = process.env.NODE_ENV as Env;
  }

  async initialize() {
    if (this.env === Env.LOCAL) {
      this.config.db = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      };
      this.config.jwt = {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      };
    }
  }

  getEnv() {
    return this.env;
  }

  getConfig() {
    return this.config;
  }
}
