import { resolve as pathResolve } from 'path';
import { config } from 'dotenv';

const { env } = process;
config({ path: pathResolve(__dirname, `./env/.env.${env.NODE_ENV}`) });

export default {
  environment: env.NODE_ENV,
  port: Number(env.PORT),
  SQL: {
    db: env.SQL_DB,
    username: env.SQL_USERNAME,
    password: env.SQL_PASSWORD,
    host: env.SQL_HOST,
    port: Number(env.SQL_PORT),
    dialect: env.SQL_DIALECT
  },
  jwt: {
    secret: env.JWT_SECRET || 'secret',
    expiration: env.JWT_EXPIRATION || '2h',
    algorithm: env.JWT_ALGORITHM || 'HS256'
  },
  password: {
    saltOrRounds: env.SALT_OR_ROUNDS || 10
  }
};
