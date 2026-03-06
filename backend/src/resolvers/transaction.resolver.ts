import { TransactionFilterInput } from "@/dtos/input/transaction-filter.input";
import {
	CreateTransactionInput,
	UpdateTransactionInput,
} from "@/dtos/input/transaction.input";
import { GqlUser } from "@/graphql/decorator/user.decorator";
import { IsAuth } from "@/middlewares/auth.middleware";
import { TransactionModel } from "@/models/transaction.model";
import { UserModel } from "@/models/user.model";
import { TransactionService } from "@/services/transaction.service";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
	private transactionService = new TransactionService();

	@Mutation(() => TransactionModel)
	async createTransaction(
		@Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
		@GqlUser() user: UserModel,
	): Promise<TransactionModel> {
		return this.transactionService.createTransaction(data, user.id);
	}

	@Query(() => [TransactionModel])
	async listTransactions(
		@GqlUser() user: UserModel,
		@Arg("filters", () => TransactionFilterInput, { nullable: true })
		filters?: TransactionFilterInput,
	): Promise<TransactionModel[]> {
		return this.transactionService.listTransactions(user.id, filters);
	}

	@Query(() => TransactionModel)
	async getTransaction(
		@Arg("id", () => String) id: string,
		@GqlUser() user: UserModel,
	): Promise<TransactionModel> {
		return this.transactionService.getTransaction(id, user.id);
	}

	@Mutation(() => TransactionModel)
	async updateTransaction(
		@Arg("id", () => String) id: string,
		@Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
		@GqlUser() user: UserModel,
	): Promise<TransactionModel> {
		return this.transactionService.updateTransaction(id, user.id, data);
	}

	@Mutation(() => Boolean)
	async deleteTransaction(
		@Arg("id", () => String) id: string,
		@GqlUser() user: UserModel,
	): Promise<boolean> {
		return this.transactionService.deleteTransaction(id, user.id);
	}
}
