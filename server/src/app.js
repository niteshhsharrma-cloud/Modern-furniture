import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({
  origin: env.clientUrl,
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.use("/api/auth/login", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false
}));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
