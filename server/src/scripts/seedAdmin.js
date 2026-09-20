import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import Admin from "../models/Admin.js";

async function seed() {
  if (!env.adminEmail || !env.adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
  }

  await connectDatabase();

  const passwordHash = await bcrypt.hash(env.adminPassword, 12);
  const admin = await Admin.findOneAndUpdate(
    { email: env.adminEmail.toLowerCase() },
    {
      email: env.adminEmail.toLowerCase(),
      passwordHash,
      role: "admin"
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Admin ready: ${admin.email}`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
