export type Config = {
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
};

export enum Env {
  LOCAL = 'local',
  DEV = 'dev',
  PRD = 'prd',
}
