import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { env } from "../config/env.js";
import { signAdminToken } from "../utils/auth.js";

function cookieOptions() {
  return {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: "lax",
    maxAge: 2 * 60 * 60 * 1000,
    path: "/"
  };
}

export async function login(req, res) {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const admin = await Admin.findOne({ email });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = signAdminToken(admin);
  res.cookie("admin_token", token, cookieOptions());

  return res.json({
    admin: { id: admin._id, email: admin.email, role: admin.role }
  });
}

export function logout(_req, res) {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: "lax",
    path: "/"
  });
  res.json({ message: "Logged out." });
}

export function me(req, res) {
  res.json({
    admin: { id: req.admin._id, email: req.admin.email, role: req.admin.role }
  });
}
