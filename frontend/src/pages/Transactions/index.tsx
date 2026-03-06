import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { LIST_TRANSACTION } from "@/lib/graphql/queries/Transactions";
import type { Transaction } from "@/types";
import { useQuery } from "@apollo/client/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateTransactionDialog } from "./components/CreateTransactionDialog";
import { DeleteTransactionDialog } from "./components/DeleteTransactionDialog";
import { EditTransactionDialog } from "./components/EditTransactionDialog";
import { TransactionsFilters } from "./components/TransactionsFilters";
import { TransactionsTable } from "./components/TransactionsTable";

export const Transactions = () => {
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [transaction, setTransaction] = useState<Transaction | null>(null);

	const { data, refetch } = useQuery<{ listTransactions: Transaction[] }>(
		LIST_TRANSACTION,
	);

	const transactions = data?.listTransactions ?? [];

	const handleDeleteTransaction = (deleteTransaction: Transaction) => {
		setTransaction(deleteTransaction);
		setOpenDeleteDialog(true);
	};

	const handleEditTransaction = (editTransaction: Transaction) => {
		setTransaction(editTransaction);
		setOpenEditDialog(true);
	};

	return (
		<Page>
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-[24px] font-bold text-gray-800">
						Transações
					</h1>
					<p className="text-[16px] text-gray-600">
						Gerencie todas as suas transações financeiras
					</p>
				</div>

				<CreateTransactionDialog
					open={openCreateDialog}
					onOpenChange={setOpenCreateDialog}
					onCreated={refetch}
				/>
				<Button
					variant="brand"
					onClick={() => setOpenCreateDialog(true)}
				>
					<Plus className="mr-2 h-4 w-4 text-gray-100" />
					Nova transação
				</Button>
			</div>
			<TransactionsFilters />

			<TransactionsTable
				transactions={transactions}
				onDelete={handleDeleteTransaction}
				onEdit={handleEditTransaction}
			/>

			<EditTransactionDialog
				open={openEditDialog}
				onOpenChange={setOpenEditDialog}
				transaction={transaction}
			/>

			<DeleteTransactionDialog
				open={openDeleteDialog}
				onOpenChange={setOpenDeleteDialog}
				transaction={transaction}
			/>
		</Page>
	);
};
