import { NextFunction, Request, Response } from "express";
import { loginService } from "./auth.service";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await loginService(req.body);
        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
};