import 'dotenv/config';

export const ENV_VARS={
    PORT:process.env.PORT || 3000,
    MONGO_URL:process.env.MONGO_URL,
    REDIS_URL:process.env.REDIS_URL,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    NODE_ENV:process.env.NODE_ENV,//default:Ad88AAIjcDEzNzZhOTgzYTUzNWQ0ZjFmYWM4MDRhNWRlYTBiNWQzNXAxMA@saved-oriole-57148.upstash.io:6379
}