import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/types";
import { useState } from "react";
import { TransactionTableRow } from "./TransactionsTableRow";

interface TableProps {
	transactions: Transaction[];
	onDelete: (transaction: Transaction) => void;
	onEdit: (transaction: Transaction) => void;
}

const itemsPerPage = 10;

export const TransactionsTable = ({
	transactions,
	onDelete,
	onEdit,
}: TableProps) => {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(transactions.length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const currentItems = transactions.slice(startIndex, endIndex);

	return (
		<div className="rounded-md border border-gray-200">
			<Table className="bg-white rounded w-full">
				<TableHeader>
					<TableRow className="border-b border-gray-300">
						<TableHead className="text-left text-gray-500 pl-6">
							Descrição
						</TableHead>
						<TableHead className="text-center text-gray-500">
							Data
						</TableHead>
						<TableHead className="text-center text-gray-500">
							Categoria
						</TableHead>
						<TableHead className="text-center text-gray-500">
							Tipo
						</TableHead>
						<TableHead className="text-right text-gray-500">
							Valor
						</TableHead>
						<TableHead className="text-right text-gray-500">
							Ações
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{transactions.length > 0 ? (
						currentItems.map((transaction) => {
							return (
								<TransactionTableRow
									key={transaction.id}
									transaction={transaction}
									onDelete={onDelete}
									onEdit={onEdit}
								/>
							);
						})
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-6">
								Sem transações
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				<TableFooter className="border-t-gray-300">
					<TableRow>
						<TableCell colSpan={6}>
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground text-gray-700  w-full">
									{startIndex + 1} a{" "}
									{Math.min(endIndex, transactions.length)} |{" "}
									{transactions.length} resultados
								</span>

								<Pagination className="flex justify-end">
									<PaginationContent>
										<PaginationItem className="bg-white border border-gray-300 rounded-lg">
											<PaginationPrevious
												onClick={() =>
													setCurrentPage((prev) =>
														Math.max(prev - 1, 1),
													)
												}
											/>
										</PaginationItem>

										{Array.from(
											{ length: totalPages },
											(_, index) => (
												<PaginationItem key={index}>
													<PaginationLink
														isActive={
															currentPage ===
															index + 1
														}
														onClick={() =>
															setCurrentPage(
																index + 1,
															)
														}
														className="data-[active=true]:bg-green-base"
													>
														{index + 1}
													</PaginationLink>
												</PaginationItem>
											),
										)}

										<PaginationItem className="bg-white border border-gray-300 rounded-lg">
											<PaginationNext
												onClick={() =>
													setCurrentPage((prev) =>
														Math.min(
															prev + 1,
															totalPages,
														),
													)
												}
											/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
};
