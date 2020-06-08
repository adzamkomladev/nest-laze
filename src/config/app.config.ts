import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: +process.env.PORT || 3000,
  version: process.env.APP_VERSION || 'v1',
}));
