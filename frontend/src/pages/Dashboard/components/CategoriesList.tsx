import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryColors } from "@/constants/colors";
import type { CategoryWithStats } from "@/types";
import { Link } from "react-router-dom";

interface SummaryCardsProps {
	categories?: CategoryWithStats[];
}

export const CategoriesList = ({ categories }: SummaryCardsProps) => {
	return (
		<Card className="bg-white border border-gray-200">
			<CardHeader className="border-b border-gray-200">
				<CardTitle className="flex justify-between items-center text-center text-gray-500">
					Categorias
					<Link
						to="/categories"
						className="gap-2 text-brand-base hover:underline"
					>
						{"Gerenciar >"}
					</Link>
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				{categories && categories.length > 0 ? (
					categories.slice(0, 5).map((category) => {
						const colors = categoryColors[category.color];

						return (
							<div
								key={category.id}
								className="first:pt-3 flex items-center justify-between"
							>
								<div className="w-full">
									<Badge
										className={`font-medium text-[14px] ${colors.bgLight} ${colors.textDark} rounded-xl py-1 px-2 shadow-none`}
									>
										{category.title}
									</Badge>
								</div>

								<div className="w-full flex items-center justify-end gap-4">
									<p className="text-sm text-gray-600 text-center">
										{category.totalTransactions} itens
									</p>

									<span className="font-semibold text-gray-800">
										{(
											category.totalAmount / 100
										).toLocaleString("pt-BR", {
											style: "currency",
											currency: "BRL",
										})}
									</span>
								</div>
							</div>
						);
					})
				) : (
					<p>Sem categorias</p>
				)}
			</CardContent>
		</Card>
	);
};
