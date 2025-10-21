export const userPathsSwagger = {
    "/users": {
        post: {
            summary: "Cria um novo usuário",
            description: "Cria um novo usuário no sistema.",
            tags: ["Users"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/CreateUserDto" },
                    },
                },
            },
            responses: {
                201: {
                    description: "Usuário criado com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                example: { message: "Usuário criado com sucesso!" },
                            },
                        },
                    },
                },
                400: {
                    description: "Erro de validação",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                example: { statusCode: 400, message: "Este e-mail já está em uso." },
                            },
                        },
                    },
                },
                500: {
                    description: "Erro interno ao criar usuário",
                },
            },
        },

        get: {
            summary: "Lista todos os usuários",
            description: "Retorna uma lista de todos os usuários cadastrados no sistema.",
            tags: ["Users"],
            responses: {
                200: {
                    description: "Lista de usuários retornada com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/ReturnUserDto" },
                            },
                        },
                    },
                },
                500: {
                    description: "Erro interno ao buscar usuários",
                },
            },
        },
    },

    "/users/{id}": {
        get: {
            summary: "Busca usuário por ID",
            description: "Retorna os dados de um usuário específico pelo seu ID.",
            tags: ["Users"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    example: 1,
                    description: "ID do usuário",
                },
            ],
            responses: {
                200: {
                    description: "Usuário encontrado com sucesso",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ReturnUserDto" },
                        },
                    },
                },
                404: {
                    description: "Usuário não encontrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                example: { statusCode: 404, message: "Usuário não encontrado." },
                            },
                        },
                    },
                },
                500: {
                    description: "Erro interno ao buscar usuário",
                },
            },
        },

        patch: {
            summary: "Atualiza usuário por ID",
            description: "Atualiza as informações de um usuário específico.",
            tags: ["Users"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    example: 1,
                    description: "ID do usuário",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UpdateUserDto" },
                    },
                },
            },
            responses: {
                200: {
                    description: "Usuário atualizado com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                example: { message: "Usuário atualizado com sucesso!" },
                            },
                        },
                    },
                },
                404: {
                    description: "Usuário não encontrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                example: { statusCode: 404, message: "Usuário não encontrado." },
                            },
                        },
                    },
                },
                500: {
                    description: "Erro interno ao atualizar usuário",
                },
            },
        },
    },
};

export const userSchemas = {
    CreateUserDto: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
            name: { type: "string", example: "João da Silva" },
            email: { type: "string", example: "joao@email.com" },
            password: { type: "string", example: "minhasenha123" },
        },
    },

    UpdateUserDto: {
        type: "object",
        properties: {
            name: { type: "string", example: "João Atualizado" },
            email: { type: "string", example: "joao.novo@email.com" },
            password: { type: "string", example: "novaSenha123" },
        },
    },

    ReturnUserDto: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "João da Silva" },
            email: { type: "string", example: "joao@email.com" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
        },
    },
};
