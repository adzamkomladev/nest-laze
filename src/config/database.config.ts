import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE || 'mysql',
  host: process.env.DB_HOST || 'db4free.net',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  database: process.env.DB_DATABASE || 'nest_laze',
  username: process.env.DB_USERNAME || 'nest_laze',
  password: process.env.DB_PASSWORD || 'nest_laze',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
}));
