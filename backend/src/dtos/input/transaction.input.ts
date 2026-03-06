import { TransactionType } from "@prisma/client";
import { Field, Float, InputType } from "type-graphql";

@InputType()
export class CreateTransactionInput {
	@Field(() => String)
	description!: string;

	@Field(() => TransactionType)
	type!: TransactionType;

	@Field(() => Float)
	amount!: number;

	@Field(() => Date)
	date!: Date;

	@Field(() => String)
	categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => TransactionType, { nullable: true })
	type?: TransactionType;

	@Field(() => Float, { nullable: true })
	amount?: number;

	@Field(() => Date, { nullable: true })
	date?: Date;

	@Field(() => String, { nullable: true })
	categoryId?: string;
}
