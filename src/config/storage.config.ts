import { registerAs } from '@nestjs/config';

export default registerAs('storage', () => ({
  dest: process.env.STORAGE_DEST,
}));
