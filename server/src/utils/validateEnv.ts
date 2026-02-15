import { cleanEnv, port, str, num } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),

    AM_API_URL: str(),
    CLIENT_ID: str(),
    AUTH_KEY: str(),
  });
}

export default validateEnv;
