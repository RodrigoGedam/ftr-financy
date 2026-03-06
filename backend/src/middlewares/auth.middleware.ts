import type { GraphqlContext } from "@/graphql/context";
import type { MiddlewareFn } from "type-graphql";

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
	{ context },
	next,
) => {
	if (!context.user) throw new Error("Usuário não autenticado!");
	return next();
};
