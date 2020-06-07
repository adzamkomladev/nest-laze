import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT, 10) ?? 80,
  version: process.env.APP_VERSION,
}));
