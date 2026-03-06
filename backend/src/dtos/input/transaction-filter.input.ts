import { TransactionType } from "@prisma/client";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class TransactionFilterInput {
	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => TransactionType, { nullable: true })
	type?: TransactionType;

	@Field(() => String, { nullable: true })
	categoryId?: string;

	@Field(() => Int, { nullable: true })
	month?: number; // 1-12

	@Field(() => Int, { nullable: true })
	year?: number; // ex: 2026
}
