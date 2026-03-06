import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { categoryColors } from "@/constants/colors";
import { iconsMap } from "@/constants/icons";
import type { Transaction } from "@/types";
import { CircleArrowDown, CircleArrowUp, Pencil, Trash2 } from "lucide-react";

interface Props {
	transaction: Transaction;
	onDelete: (transaction: Transaction) => void;
	onEdit: (transaction: Transaction) => void;
}

export const TransactionTableRow = ({
	transaction,
	onDelete,
	onEdit,
}: Props) => {
	const Icon = iconsMap[transaction.category.icon];
	const colors = categoryColors[transaction.category.color];

	return (
		<TableRow className="border-b border-gray-300">
			<TableCell className="font-medium text-gray-800">
				<div className="h-full w-full flex items-center gap-2 pl-4">
					<div className={`p-2 rounded ${colors.bgLight}`}>
						<Icon className={`h-4 w-4 ${colors.textBase}`} />
					</div>
					{transaction.description}
				</div>
			</TableCell>

			<TableCell className="text-center text-gray-600">
				{new Date(transaction.date).toLocaleDateString("pt-BR")}
			</TableCell>

			<TableCell className="text-center">
				<Badge
					variant="secondary"
					className={`${colors.bgLight} ${colors.textBase} rounded-2xl px-2 py-1`}
				>
					{transaction.category.title}
				</Badge>
			</TableCell>

			<TableCell>
				{transaction.type === "income" ? (
					<div className="flex items-center justify-center border-none gap-2">
						<CircleArrowUp className="h-4 w-4 text-green-base" />
						<p className="text-green-dark">Entrada</p>
					</div>
				) : (
					<div className="flex items-center justify-center border-none gap-3">
						<CircleArrowDown className="h-4 w-4 text-red-base" />
						<p className="text-red-dark">Saída</p>
					</div>
				)}
			</TableCell>

			<TableCell className="text-right font-medium text-gray-800">
				{transaction.type === "expense" ? "-" : "+"}{" "}
				{(transaction.amount / 100).toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				})}
			</TableCell>

			<TableCell className="text-right space-x-2">
				<Button
					size="icon"
					variant="ghost"
					onClick={() => {
						onDelete(transaction);
					}}
				>
					<Trash2 className="h-4 w-4 text-red-500" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => {
						onEdit(transaction);
					}}
				>
					<Pencil className="h-4 w-4" />
				</Button>
			</TableCell>
		</TableRow>
	);
};
