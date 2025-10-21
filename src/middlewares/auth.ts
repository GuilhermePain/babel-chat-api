import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";

declare global {
    namespace Express {
        interface Request {
            user?: { id: number };
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return next(new ApiError("Acesso não autorizado.", 401));
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return next(new ApiError("Token inválido.", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        req.user = { id: Number(decoded.sub) };

        next();
    } catch (error) {
        return next(new ApiError("Token de acesso inválido ou expirado.", 401));
    }
};