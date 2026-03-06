import { TransactionType } from "@prisma/client";
import { Field, Float, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { CategoryModel } from "./category.model";
import { UserModel } from "./user.model";

@ObjectType()
export class TransactionModel {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	description!: string;

	@Field(() => Float)
	amount!: number;

	@Field(() => TransactionType)
	type!: TransactionType;

	@Field(() => GraphQLISODateTime)
	date!: Date;

	@Field(() => GraphQLISODateTime)
	createdAt!: Date;

	@Field(() => GraphQLISODateTime)
	updatedAt!: Date;

	@Field(() => String)
	userId!: string;

	@Field(() => UserModel, { nullable: true })
	user?: UserModel;

	@Field(() => String)
	categoryId!: string;

	@Field(() => CategoryModel, { nullable: true })
	category?: CategoryModel;
}
