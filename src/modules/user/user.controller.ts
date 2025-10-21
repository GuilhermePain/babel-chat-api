import { NextFunction, Request, Response } from "express";
import {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService
} from "./user.service";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.body;

    try {
        const response = await createUserService(user);

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllUsersService();

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);

    try {
        const response = await getUserByIdService(userId);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);
    const dataUpdated = req.body;

    try {
        const response = await updateUserService(userId, dataUpdated);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};
