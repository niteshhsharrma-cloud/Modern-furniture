import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAdminToken(admin) {
  return jwt.sign(
    { sub: admin._id.toString(), role: admin.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export function verifyAdminToken(token) {
  return jwt.verify(token, env.jwtSecret);
}
