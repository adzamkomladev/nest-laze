import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'ec2-3-222-30-53.compute-1.amazonaws.com',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE || 'd45r48do5ti2qv',
  username: process.env.DB_USERNAME || 'ohkjavvqvuzzef',
  password:
    process.env.DB_PASSWORD ||
    '7202822579fcfc7fe600a169946e2f710ab6b2bdef388e7ecee0dd912739a6ea',
  ssl: { rejectUnauthorized: false },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
}));
