import {
	CreateCategoryInput,
	UpdateCategoryInput,
} from "@/dtos/input/category.input";
import { GqlUser } from "@/graphql/decorator/user.decorator";
import { IsAuth } from "@/middlewares/auth.middleware";
import { CategoryModel, CategoryWithStatsModel } from "@/models/category.model";
import { UserModel } from "@/models/user.model";
import { CategoryService } from "@/services/category.service";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
	private categoryService = new CategoryService();

	@Mutation(() => CategoryModel)
	async createCategory(
		@Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
		@GqlUser() user: UserModel,
	): Promise<CategoryModel> {
		return this.categoryService.createCategory(data, user.id);
	}

	@Mutation(() => CategoryModel)
	async updateCategory(
		@Arg("id", () => String) id: string,
		@Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
		@GqlUser() user: UserModel,
	): Promise<CategoryModel> {
		return this.categoryService.updateCategory(id, user.id, data);
	}

	@Mutation(() => Boolean)
	async deleteCategory(
		@Arg("id", () => String) id: string,
		@GqlUser() user: UserModel,
	): Promise<boolean> {
		await this.categoryService.deleteCategory(id, user.id);
		return true;
	}

	@Query(() => CategoryModel)
	async getCategory(
		@Arg("id", () => String) id: string,
		@GqlUser() user: UserModel,
	): Promise<CategoryModel> {
		return this.categoryService.getCategory(id, user.id);
	}

	@Query(() => [CategoryModel])
	async listCategories(@GqlUser() user: UserModel): Promise<CategoryModel[]> {
		return this.categoryService.listCategories(user.id);
	}

	@Query(() => [CategoryWithStatsModel])
	async categoriesWithStats(
		@GqlUser() user: UserModel,
	): Promise<CategoryWithStatsModel[]> {
		return this.categoryService.listCategoriesWithStats(user.id);
	}
}
