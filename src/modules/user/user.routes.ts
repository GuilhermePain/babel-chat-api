import { Router } from "express";
import {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController
} from "./user.controller";

const routes = Router();

routes.post("/", createUserController);
routes.get("/", getAllUsersController);
routes.get("/:id", getUserByIdController);
routes.patch("/:id", updateUserController);

export default routes;
