import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginDto } from "./dtos/login";
import prisma from "../../config/prisma";
import { ApiError } from "../../errors/ApiError";

export const loginService = async (loginDto: LoginDto) => {
    const { email, password } = loginDto;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new ApiError("E-mail ou senha inválidos.", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError("E-mail ou senha inválidos.", 401);
    }

    try {
        const access_token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { access_token };
    } catch (error) {
        throw new ApiError("Houve um erro interno ao fazer login.");
    }

};