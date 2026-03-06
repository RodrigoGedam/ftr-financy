import { prismaClient } from "@/prisma";

export interface DashboardSummary {
	monthlyIncome: number;
	monthlyExpense: number;
	totalCategories: number;
	totalTransactions: number;
	topCategory: {
		id: string;
		title: string;
		totalTransactions: number;
	} | null;
	totalBalance: number;
}

export class DashboardService {
	async getDashboard(
		userId: string,
		date: Date = new Date(),
	): Promise<DashboardSummary> {
		const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
		const endOfMonth = new Date(
			date.getFullYear(),
			date.getMonth() + 1,
			0,
			23,
			59,
			59,
		);

		const [
			monthlyIncome,
			monthlyExpense,
			totalCategories,
			totalTransactions,
			topCategoryGrouped,
			incomeTotal,
			expenseTotal,
		] = await Promise.all([
			//Income do mês
			prismaClient.transaction.aggregate({
				where: {
					userId,
					type: "income",
					date: {
						gte: startOfMonth,
						lte: endOfMonth,
					},
				},
				_sum: { amount: true },
			}),

			//Expense do mês
			prismaClient.transaction.aggregate({
				where: {
					userId,
					type: "expense",
					date: {
						gte: startOfMonth,
						lte: endOfMonth,
					},
				},
				_sum: { amount: true },
			}),

			//Total categorias
			prismaClient.category.count({
				where: { userId },
			}),

			//Total transações
			prismaClient.transaction.count({
				where: { userId },
			}),

			//Categoria com mais transações
			prismaClient.transaction.groupBy({
				by: ["categoryId"],
				where: { userId },
				_count: { _all: true },
				orderBy: {
					_count: {
						categoryId: "desc",
					},
				},
				take: 1,
			}),

			//Total income geral
			prismaClient.transaction.aggregate({
				where: {
					userId,
					type: "income",
				},
				_sum: { amount: true },
			}),

			//Total expense geral
			prismaClient.transaction.aggregate({
				where: {
					userId,
					type: "expense",
				},
				_sum: { amount: true },
			}),
		]);

		const monthlyIncomeValue = (monthlyIncome._sum.amount ?? 0) / 100;
		const monthlyExpenseValue = (monthlyExpense._sum.amount ?? 0) / 100;

		const totalIncomeValue = incomeTotal._sum.amount ?? 0;
		const totalExpenseValue = expenseTotal._sum.amount ?? 0;

		const totalBalanceValue = (totalIncomeValue - totalExpenseValue) / 100;

		let topCategory = null;

		if (topCategoryGrouped.length) {
			const category = await prismaClient.category.findUnique({
				where: { id: topCategoryGrouped[0].categoryId },
			});

			if (category) {
				topCategory = {
					id: category.id,
					title: category.title,
					totalTransactions: topCategoryGrouped[0]._count._all,
				};
			}
		}

		return {
			monthlyIncome: monthlyIncomeValue,
			monthlyExpense: monthlyExpenseValue,
			totalCategories,
			totalTransactions,
			topCategory,
			totalBalance: totalBalanceValue,
		};
	}
}
