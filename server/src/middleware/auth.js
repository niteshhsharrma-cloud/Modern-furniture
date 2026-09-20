import Admin from "../models/Admin.js";
import { verifyAdminToken } from "../utils/auth.js";

export async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ message: "Authentication required." });

    const payload = verifyAdminToken(token);
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Admin access required." });
    }

    const admin = await Admin.findById(payload.sub).select("_id email role");
    if (!admin) return res.status(401).json({ message: "Authentication required." });

    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session." });
  }
}
