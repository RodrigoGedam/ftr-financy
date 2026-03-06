import { CategoryColor, IconName } from "@prisma/client";
import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "type-graphql";
import { TransactionModel } from "./transaction.model";
import { UserModel } from "./user.model";

@ObjectType()
export class CategoryModel {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	title!: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => CategoryColor)
	color!: CategoryColor;

	@Field(() => IconName)
	icon!: IconName;

	@Field(() => GraphQLISODateTime)
	createdAt!: Date;

	@Field(() => GraphQLISODateTime)
	updatedAt!: Date;

	@Field(() => String)
	userId!: string;

	@Field(() => UserModel, { nullable: true })
	user?: UserModel;

	@Field(() => [TransactionModel], { nullable: true })
	transactions?: TransactionModel[];
}

@ObjectType()
export class CategoryWithStatsModel {
	@Field(() => String)
	id: string;

	@Field(() => String)
	title: string;

	@Field(() => CategoryColor)
	color: CategoryColor;

	@Field(() => IconName)
	icon: IconName;

	@Field(() => Int)
	totalTransactions: number;

	@Field(() => Int)
	totalAmount: number;
}
