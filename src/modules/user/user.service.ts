import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import { CreateUserDto } from "./dtos/create-user";
import { ApiError } from "../../errors/ApiError";
import { UpdateUserDto } from "./dtos/update-user";
import { ReturnUserDto } from "./dtos/return-user";

export const createUserService = async (createUserDto: CreateUserDto): Promise<{ message: string }> => {
    const { name, email, password } = createUserDto;

    const saltRounds = 12;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new ApiError("Este e-mail já está em uso.", 400);
    }

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { message: "Usuário criado com sucesso!" };

    } catch (error) {
        throw new ApiError("Houve um erro interno ao criar usuário.", 500);
    }
};

export const getAllUsersService = async () => {
    try {
        const users = await prisma.user.findMany();

        return users.map((user) => new ReturnUserDto(user));
    } catch (error) {
        throw new ApiError("Houve um erro interno ao buscar todos os usuários.", 500);
    }
};

export const getUserByIdService = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new ApiError("Usuário não encontrado.", 404);
        }

        return new ReturnUserDto(user);
    } catch (error) {
        console.log(error);

        throw new ApiError("Houve um erro interno ao buscar usuário.", 500);
    }
};

export const updateUserService = async (id: number, updateUserDto: UpdateUserDto): Promise<{ message: string }> => {

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
        throw new ApiError("Usuário não encontrado.", 404);
    }

    try {
        await prisma.user.update({
            where: { id },
            data: { ...updateUserDto }
        });

        return { message: "Usuário atualizado com sucesso!" };

    } catch (error) {
        throw new ApiError("Houve um erro interno ao atualizar usuário.", 500);
    }
};