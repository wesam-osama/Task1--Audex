import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import errorMiddleware from "./middlewares/error.middleware";
import projectRoutes from "./modules/project/project.routes";
import userRoutes from "./modules/user/user.routes";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Authenticated Project API is running",
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() 
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use(errorMiddleware);

export default app;
