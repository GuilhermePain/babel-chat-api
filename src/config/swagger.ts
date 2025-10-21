import swaggerJSDoc from "swagger-jsdoc";
import { userPathsSwagger, userSchemas } from "../modules/user/user.swagger";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Babel-chat API",
        version: "1.0.0",
        description: "Documentação da API de chat de conversas em tempo real.",
    },
    servers: [
        { url: "http://localhost:3355" },
    ],
    paths: {
        ...userPathsSwagger
    },
    components: {
        schemas: {
            ...userSchemas
        },
    },
};

export const swaggerSpec = swaggerJSDoc({
    definition: swaggerDefinition,
    apis: [],
});
