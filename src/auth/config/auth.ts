import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN,
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  },
}));
