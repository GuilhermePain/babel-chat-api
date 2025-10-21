export const authPathsSwagger = {
    "/login": {
        post: {
            summary: "Autenticação de usuário",
            description:
                "Realiza o login do usuário e retorna um token JWT de acesso.",
            tags: ["Auth"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/LoginDto" },
                    },
                },
            },
            responses: {
                200: {
                    description: "Login realizado com sucesso.",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/LoginResponseDto" },
                        },
                    },
                },
                401: {
                    description: "Credenciais inválidas.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                example: { statusCode: 401, message: "E-mail ou senha inválidos." },
                            },
                        },
                    },
                },
                500: {
                    description: "Erro interno ao realizar login.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                example: { statusCode: 500, message: "Houve um erro interno ao fazer login." },
                            },
                        },
                    },
                },
            },
        },
    },
};

export const authSchemas = {
    LoginDto: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { type: "string", example: "joao@email.com" },
            password: { type: "string", example: "minhasenha123" },
        },
    },

    LoginResponseDto: {
        type: "object",
        properties: {
            access_token: {
                type: "string",
                example:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MzM5ODAwMCwiZXhwIjoxNjkzNDAxNjAwfQ.F5uYYFqQjzq9OP-8yHbJGRuSIEzE1_KbU7A8Ebw3cWk",
            },
        },
    },
};
