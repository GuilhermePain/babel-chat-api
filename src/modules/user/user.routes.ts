import { Router } from "express";
import {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController
} from "./user.controller";
import { auth } from "../../middlewares/auth";

const routes = Router();

routes.post("/", createUserController);
routes.get("/", auth, getAllUsersController);
routes.get("/:id", auth, getUserByIdController);
routes.patch("/:id", auth, updateUserController);

export default routes;
