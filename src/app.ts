import express from "express";
import userRoutes from "./modules/user/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";

export const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);