import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { categoryColors } from "@/constants/colors";
import { iconsMap } from "@/constants/icons";
import { CreateTransactionDialog } from "@/pages/Transactions/components/CreateTransactionDialog";
import type { Transaction } from "@/types";
import { CircleArrowDown, CircleArrowUp, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SummaryCardsProps {
	transactions?: Transaction[];
	onCreated?: () => void;
}

interface TransactionRowProps {
	transaction: Transaction;
}

function TransactionRow({ transaction }: TransactionRowProps) {
	const Icon = iconsMap[transaction.category.icon];
	const colors = categoryColors[transaction.category.color];

	const formattedAmount = (transaction.amount / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});

	return (
		<TableRow className="h-18 border border-gray-200">
			<TableCell className="px-6">
				<div className="flex items-center gap-3">
					<div className={`p-2 rounded ${colors.bgLight}`}>
						<Icon className={`h-5 w-5 ${colors.textBase}`} />
					</div>

					<div>
						<p className="text-[16px] ]font-medium text-gray-800">
							{transaction.description}
						</p>
						<p className="text-sm mt-1 text-gray-600">
							{new Date(transaction.date).toLocaleDateString(
								"pt-BR",
							)}
						</p>
					</div>
				</div>
			</TableCell>

			<TableCell className="text-right px-6">
				<div className="flex items-center justify-end gap-4">
					<div className="w-full">{""}</div>
					<span className="text-center w-full">
						<Badge
							variant="secondary"
							className={`${colors.bgLight} rounded-2xl px-3 py-1 font-medium text-[14px]`}
						>
							{transaction.category.title}
						</Badge>
					</span>
					<span className="w-full flex items-center justify-end gap-2 text-sm font-semibold whitespace-nowrap">
						{transaction.type === "expense" ? "-" : "+"}{" "}
						{formattedAmount}
						{transaction.type === "income" ? (
							<CircleArrowUp className="h-4 w-4 text-green-base" />
						) : (
							<CircleArrowDown className="h-4 w-4 text-red-base" />
						)}
					</span>
				</div>
			</TableCell>
		</TableRow>
	);
}

export function TransactionsList({
	transactions,
	onCreated,
}: SummaryCardsProps) {
	const [openDialog, setOpenDialog] = useState(false);

	return (
		<Card className="w-full rounded-xl border border-gray-200 bg-white">
			<CardHeader className="border-b border-gray-200 px-6 py-4">
				<CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
					<span className="text-gray-500">TRANSAÇÕES RECENTES</span>

					<Link
						to="/transactions"
						className="font-medium text-brand-base hover:underline"
					>
						{"Ver todas >"}
					</Link>
				</CardTitle>
			</CardHeader>

			<CardContent className="p-0">
				<Table>
					<TableBody>
						{transactions && transactions.length > 0 ? (
							transactions
								.slice(0, 5)
								.map((transaction) => (
									<TransactionRow
										key={transaction.id}
										transaction={transaction}
									/>
								))
						) : (
							<TableRow>
								<TableCell className="text-center py-6">
									Nenhuma transação encontrada
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>

			<CardFooter className="border-t border-gray-200 px-6 py-4 flex justify-center">
				<CreateTransactionDialog
					open={openDialog}
					onOpenChange={setOpenDialog}
					onCreated={onCreated}
				/>
				<Button
					className="text-sm font-medium text-brand-base hover:underline shadow-none"
					onClick={() => setOpenDialog(true)}
				>
					<Plus size={16} className="mr-2" />
					Nova transação
				</Button>
			</CardFooter>
		</Card>
	);
}
