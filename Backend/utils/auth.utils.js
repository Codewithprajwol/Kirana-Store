import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env.config.js";
import { redis } from "../lib/redis.js";

export const generateTokenAndSetCookie = async(userId, res) => {
  const accessToken = jwt.sign({ userId }, ENV_VARS.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign({ userId }, ENV_VARS.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("accessToken", accessToken, { httpOnly: true,
    sameSite:'strict',
    secure:ENV_VARS.NODE_ENV !== "development",
    maxAge: 1* 60 * 1000 });

  res.cookie("refreshToken", refreshToken, { httpOnly: true,
    sameSite:'strict',
    secure:ENV_VARS.NODE_ENV !== "development",
    maxAge: 7*24*60* 60 * 1000 });

    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7*24*60*60);
  };

