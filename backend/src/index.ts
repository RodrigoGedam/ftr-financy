import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { buildContext } from "./graphql/context";
import "./models/enums";
import { AuthResolver } from "./resolvers/auth.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";
import { DashboardResolver } from "./resolvers/dashboard.resolver";
import { TransactionResolver } from "./resolvers/transaction.resolver";
import { UserResolver } from "./resolvers/user.resolver";

async function bootstrap() {
	const app = express();

	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		}),
	);

	const schema = await buildSchema({
		resolvers: [
			AuthResolver,
			UserResolver,
			TransactionResolver,
			CategoryResolver,
			DashboardResolver,
		],
		validate: false,
		emitSchemaFile: "./schema.graphql",
	});

	const server = new ApolloServer({
		schema,
	});

	await server.start();

	app.use(
		"/graphql",
		express.json(),
		expressMiddleware(server, {
			context: buildContext,
		}),
	);

	app.listen(
		{
			port: 4000,
		},
		() => {
			console.log(`Servidor iniciado na porta 4000!`);
		},
	);
}

bootstrap();
