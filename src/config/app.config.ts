import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: Number(process.env.PORT) || 3000,
  version: process.env.VERSION || 'v1',
}));
