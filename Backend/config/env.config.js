import 'dotenv/config';

export const ENV_VARS={
    PORT:process.env.PORT || 3000,
    MONGO_URL:process.env.MONGO_URL
}