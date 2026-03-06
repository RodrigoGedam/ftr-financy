import { TransactionFilterInput } from "@/dtos/input/transaction-filter.input";
import {
	CreateTransactionInput,
	UpdateTransactionInput,
} from "@/dtos/input/transaction.input";
import { prismaClient } from "@/prisma";

export class TransactionService {
	async createTransaction(data: CreateTransactionInput, userId: string) {
		const category = await prismaClient.category.findFirst({
			where: {
				id: data.categoryId,
				userId,
			},
		});

		if (!category) {
			throw new Error("Categoria não encontrada");
		}

		return prismaClient.transaction.create({
			data: {
				description: data.description,
				amount: Math.round(data.amount * 100),
				type: data.type,
				date: data.date,
				userId,
				categoryId: data.categoryId,
			},
			include: {
				category: true,
				user: true,
			},
		});
	}

	async listTransactions(userId: string, filters?: TransactionFilterInput) {
		const where: any = {
			userId,
		};

		//Filtro por descrição
		if (filters?.description) {
			where.description = {
				contains: filters.description,
				mode: "insensitive",
			};
		}

		//Filtro por tipo
		if (filters?.type) {
			where.type = filters.type;
		}

		//Filtro por categoria
		if (filters?.categoryId) {
			where.categoryId = filters.categoryId;
		}

		//Filtro por mês/ano
		if (filters?.month && filters?.year) {
			const startDate = new Date(filters.year, filters.month - 1, 1);
			const endDate = new Date(
				filters.year,
				filters.month,
				0,
				23,
				59,
				59,
			);

			where.date = {
				gte: startDate,
				lte: endDate,
			};
		}

		return prismaClient.transaction.findMany({
			where,
			include: {
				category: true,
			},
			orderBy: {
				date: "desc",
			},
		});
	}

	async getTransaction(id: string, userId: string) {
		const transaction = await prismaClient.transaction.findFirst({
			where: {
				id,
				userId,
			},
			include: {
				category: true,
			},
		});

		if (!transaction) {
			throw new Error("Transação não encontrada");
		}

		return transaction;
	}

	async updateTransaction(
		id: string,
		userId: string,
		data: UpdateTransactionInput,
	) {
		const transaction = await prismaClient.transaction.findFirst({
			where: {
				id,
				userId,
			},
		});

		if (!transaction) {
			throw new Error("Transação não encontrada");
		}

		if (data.categoryId) {
			const category = await prismaClient.category.findFirst({
				where: {
					id: data.categoryId,
					userId,
				},
			});

			if (!category) {
				throw new Error("Categoria inválida");
			}
		}

		return prismaClient.transaction.update({
			where: { id },
			data,
			include: {
				category: true,
			},
		});
	}

	async deleteTransaction(id: string, userId: string) {
		const transaction = await prismaClient.transaction.findFirst({
			where: {
				id,
				userId,
			},
		});

		if (!transaction) {
			throw new Error("Transação não encontrada");
		}

		await prismaClient.transaction.delete({
			where: { id },
		});

		return true;
	}
}
