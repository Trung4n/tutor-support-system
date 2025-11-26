import session from "express-session";
import redis from "./client.js";
import { env } from "../config/env.js";
import { RedisStore } from "connect-redis";

export const sessionMiddleware = (appPrefix) =>
  session({
    store: new RedisStore({
      client: redis,
      prefix: `shared:sess:`, // prefix for all sessions
    }),
    name: 'connect.sid', //same cookie for all sessions
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true, // reset session expiration on each request
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60,
      domain: "localhost", // same domain for all sessions
    },
  });
