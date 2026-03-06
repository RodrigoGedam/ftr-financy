import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { categoryColors } from "@/constants/colors";
import { iconsMap } from "@/constants/icons";
import type { Category } from "@/types";
import { SquarePen, Trash2 } from "lucide-react";

interface Props {
	category: Category;
	statsMap?: Map<string, number>;
	onDelete: (category: Category) => void;
	onEdit: (category: Category) => void;
}

export const CategoriesCard = ({
	category,
	statsMap,
	onDelete,
	onEdit,
}: Props) => {
	const Icon = iconsMap[category.icon];
	const colors = categoryColors[category.color];

	const countTransactions = statsMap?.get(category.id) ?? 0;

	return (
		<Card className="border-gray-200 bg-white">
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<div className={`${colors.bgLight} p-2 rounded`}>
					<Icon className={`h-4 w-4 ${colors.textBase}`} />
				</div>
				<div className="space-x-2">
					<Button
						size="icon"
						variant="ghost"
						className="border border-gray-300"
						onClick={() => {
							onDelete(category);
						}}
					>
						<Trash2 className="h-4 w-4 text-danger" />
					</Button>
					<Button
						size="icon"
						variant="ghost"
						className="border border-gray-300"
						onClick={() => {
							onEdit(category);
						}}
					>
						<SquarePen className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>

			<CardContent className="space-y-3">
				<h3 className="font-semibold text-[16px]">{category.title}</h3>
				<p className="text-sm text-muted-foreground">
					{category.description || "\u00A0"}
				</p>
			</CardContent>
			<CardFooter className="space-y-3">
				<div className="flex items-center justify-between w-full">
					<Badge
						className={`${colors.bgLight} ${colors.textDark} rounded-xl py-1 shadow-none`}
					>
						{category.title}
					</Badge>
					<span className="text-sm text-muted-foreground">
						{countTransactions} itens
					</span>
				</div>
			</CardFooter>
		</Card>
	);
};
