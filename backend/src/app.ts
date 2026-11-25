
import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route.js"
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "success",
    message: "PoshakSwitch API is running!",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/users", userRoute);
app.use(errorHandler);

export default app;
