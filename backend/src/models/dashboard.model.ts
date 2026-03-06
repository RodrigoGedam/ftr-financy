import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
class TopCategory {
	@Field(() => String)
	id!: string;

	@Field(() => String)
	title!: string;

	@Field(() => Int)
	totalTransactions!: number;
}

@ObjectType()
export class DashboardModel {
	@Field(() => Float)
	monthlyIncome!: number;

	@Field(() => Float)
	monthlyExpense!: number;

	@Field(() => Int)
	totalCategories!: number;

	@Field(() => Int)
	totalTransactions!: number;

	@Field(() => Float)
	totalBalance!: number;

	@Field(() => TopCategory, { nullable: true })
	topCategory?: TopCategory | null;
}
