import { Router } from "express";
import { loginController } from "./auth.controller";

const routes = Router();

routes.post("/login", loginController);

export default routes;