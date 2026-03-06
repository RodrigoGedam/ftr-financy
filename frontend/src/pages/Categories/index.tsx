import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import {
	CATEGORIES_WITH_STATS,
	LIST_CATEGORIES,
} from "@/lib/graphql/queries/Categories";
import { DASHBOARD_VALUES } from "@/lib/graphql/queries/Dashboard";
import type { Category, CategoryWithStats, DashboardData } from "@/types";
import { useQuery } from "@apollo/client/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CategoriesCard } from "./components/CategoriesCard";
import { CategoriesStats } from "./components/CategoriesStats";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";
import { DeleteCategoryDialog } from "./components/DeleteCategoryDialog";
import { EditCategoryDialog } from "./components/EditCategoryDialog";

export const Categories = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [category, setCategory] = useState<Category | null>(null);

	const { data: dashboardData, loading: dashboardLoading } = useQuery<{
		dashboard: DashboardData;
	}>(DASHBOARD_VALUES, {
		fetchPolicy: "network-only",
	});

	const {
		data: categoriesData,
		loading: categoriesLoading,
		refetch: categoriesRefetch,
	} = useQuery<{
		listCategories: Category[];
	}>(LIST_CATEGORIES);

	const { data: categoriesWithStatsData } = useQuery<{
		categoriesWithStats: CategoryWithStats[];
	}>(CATEGORIES_WITH_STATS, {
		fetchPolicy: "network-only",
	});

	if (categoriesLoading || dashboardLoading) return <p>Carregando...</p>;

	const dashboard = dashboardData?.dashboard;
	const categories = categoriesData?.listCategories;

	const categoriesWithStats = categoriesWithStatsData?.categoriesWithStats;
	const statsMap = new Map(
		categoriesWithStats?.map((c) => [c.id, c.totalTransactions]),
	);

	const handleDeleteCategory = (deleteCategory: Category) => {
		setCategory(deleteCategory);
		setOpenDeleteDialog(true);
	};

	const handleEditCategory = (editCategory: Category) => {
		setCategory(editCategory);
		setOpenEditDialog(true);
	};

	return (
		<Page>
			<div className="flex items-center justify-between w-full">
				<div>
					<h1 className="text-2xl font-bold text-gray-800">
						Categorias
					</h1>
					<p className="text-muted-foreground text-gray-600">
						Organize suas transações por categorias
					</p>
				</div>

				<CreateCategoryDialog
					open={openDialog}
					onOpenChange={setOpenDialog}
					onCreated={categoriesRefetch}
				/>
				<Button variant="brand" onClick={() => setOpenDialog(true)}>
					<Plus className="h-6 w-6 text-gray-100" />
					Nova categoria
				</Button>
			</div>
			<CategoriesStats dashboard={dashboard} />

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{categories && categories.length > 0 ? (
					categories.map((category) => (
						<CategoriesCard
							key={category.id}
							category={category}
							statsMap={statsMap}
							onDelete={handleDeleteCategory}
							onEdit={handleEditCategory}
						/>
					))
				) : (
					<p>Sem categorias</p>
				)}
			</div>

			<EditCategoryDialog
				open={openEditDialog}
				onOpenChange={setOpenEditDialog}
				category={category}
			/>

			<DeleteCategoryDialog
				open={openDeleteDialog}
				onOpenChange={setOpenDeleteDialog}
				category={category}
			/>
		</Page>
	);
};
