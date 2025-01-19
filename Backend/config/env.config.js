import 'dotenv/config';

export const ENV_VARS={
    PORT:process.env.PORT || 3000,
    MONGO_URL:process.env.MONGO_URL,
    REDIS_URL:process.env.REDIS_URL,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    NODE_ENV:process.env.NODE_ENV,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,  
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
}