import { registerAs } from '@nestjs/config';

export default registerAs('keycloak', () => ({
  authServerUrl:
    process.env.KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080/auth',
  realm: process.env.KEYCLOAK_REALM || 'master',
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  clientSecret: process.env.KEYCLOAK_SECRET,
  retryAttempts: parseInt(process.env.KEYCLOAK_RETRY_ATTEMPTS || '3', 10),
  retryDelay: parseInt(process.env.KEYCLOAK_RETRY_DELAY || '3000', 10),
}));
