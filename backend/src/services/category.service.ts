import {
	CreateCategoryInput,
	UpdateCategoryInput,
} from "@/dtos/input/category.input";
import { prismaClient } from "@/prisma";

export class CategoryService {
	async createCategory(data: CreateCategoryInput, userId: string) {
		return prismaClient.category.create({
			data: {
				...data,
				userId,
			},
		});
	}

	async listCategories(userId: string) {
		return prismaClient.category.findMany({
			where: { userId },
		});
	}

	async getCategory(id: string, userId: string) {
		const category = await prismaClient.category.findFirst({
			where: {
				id,
				userId,
			},
		});

		if (!category) {
			throw new Error("Categoria não encontrada");
		}

		return category;
	}

	async deleteCategory(id: string, userId: string) {
		const category = await prismaClient.category.findFirst({
			where: { id, userId },
		});

		if (!category) throw new Error("Categoria não encontrada");

		return prismaClient.category.delete({
			where: { id },
		});
	}

	async updateCategory(
		id: string,
		userId: string,
		data: UpdateCategoryInput,
	) {
		const category = await prismaClient.category.findFirst({
			where: { id, userId },
		});

		if (!category) throw new Error("Categoria não encontrada");

		return prismaClient.category.update({
			where: { id },
			data,
		});
	}

	async listCategoriesWithStats(userId: string) {
		const categories = await prismaClient.category.findMany({
			where: { userId },
			select: {
				id: true,
				title: true,
				color: true,
				icon: true,
			},
		});

		const stats = await prismaClient.transaction.groupBy({
			by: ["categoryId"],
			where: { userId },
			_sum: { amount: true },
			_count: { _all: true },
		});

		return categories.map((category) => {
			const categoryStats = stats.find(
				(stat) => stat.categoryId === category.id,
			);

			return {
				id: category.id,
				title: category.title,
				color: category.color,
				icon: category.icon,
				totalTransactions: categoryStats?._count._all ?? 0,
				totalAmount: categoryStats?._sum.amount ?? 0,
			};
		});
	}
}
