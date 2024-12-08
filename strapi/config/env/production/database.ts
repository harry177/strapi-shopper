import { parse } from 'pg-connection-string';
const config = parse(process.env.DATABASE_URL);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
});