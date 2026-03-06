import { Card, CardContent } from "@/components/ui/card";
import type { DashboardData } from "@/types";
import { ArrowUpDown, Tag, Utensils } from "lucide-react";

interface CategoryStatsProps {
	dashboard?: DashboardData | null;
}

export const CategoriesStats = ({ dashboard }: CategoryStatsProps) => {
	const totalCategories = dashboard?.totalCategories ?? 0;
	const totalTransactions = dashboard?.totalTransactions ?? 0;
	const topCategoryTitle = dashboard?.topCategory?.title ?? "Sem categoria";

	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card className="border-gray-200 bg-white">
				<CardContent className="flex items-center gap-4 p-6">
					<Tag className="h-6 w-6 text-gray-700" />
					<div>
						<p className="text-2xl font-bold text-gray-800">
							{totalCategories}
						</p>
						<p className="font-medium text-muted-foreground text-gray-500 uppercase">
							Total de categorias
						</p>
					</div>
				</CardContent>
			</Card>

			<Card className="border-gray-200 bg-white">
				<CardContent className="flex items-center gap-4 p-6">
					<ArrowUpDown className="h-6 w-6 text-purple-base" />
					<div>
						<p className="text-2xl font-bold text-gray-800">
							{totalTransactions}
						</p>
						<p className="font-medium text-muted-foreground text-gray-500 uppercase">
							Total de transações
						</p>
					</div>
				</CardContent>
			</Card>

			<Card className="border-gray-200 bg-white">
				<CardContent className="flex items-center gap-4 p-6">
					<Utensils className="h-6 w-6 text-blue-base" />
					<div>
						<p className="text-2xl font-bold text-gray-800">
							{topCategoryTitle}
						</p>
						<p className="font-medium text-muted-foreground text-gray-500 uppercase">
							Categoria mais utilizada
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
