import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transactions";
import {
	CATEGORIES_WITH_STATS,
	LIST_CATEGORIES,
} from "@/lib/graphql/queries/Categories";
import { DASHBOARD_VALUES } from "@/lib/graphql/queries/Dashboard";
import { LIST_TRANSACTION } from "@/lib/graphql/queries/Transactions";
import type { Transaction } from "@/types";
import { useMutation } from "@apollo/client/react";

interface DeleteTransactionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	transaction: Transaction | null;
}

export const DeleteTransactionDialog = ({
	open,
	onOpenChange,
	transaction,
}: DeleteTransactionDialogProps) => {
	const [deleteTransactionMutation, { loading }] = useMutation(
		DELETE_TRANSACTION,
		{
			onCompleted: () => {
				onOpenChange(false);
			},
			refetchQueries: [
				{ query: LIST_TRANSACTION },
				{ query: LIST_CATEGORIES },
				{ query: DASHBOARD_VALUES },
				{ query: CATEGORIES_WITH_STATS },
			],
			awaitRefetchQueries: true,
		},
	);

	const handleDeleteTransaction = async () => {
		if (!transaction) return;
		await deleteTransactionMutation({
			variables: {
				deleteTransactionId: transaction.id,
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="sm:max-w-106.25 bg-white border border-gray-200"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Remover Transação</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-gray-600">
					Tem certeza que deseja remover
					<span className="font-bold text-gray-800">
						{" "}
						{transaction?.description}{" "}
					</span>
					?<p>Essa ação não poderá ser desfeita.</p>
				</p>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						className="border border-gray-300"
					>
						Cancelar
					</Button>
					<Button
						variant="outline"
						className="border border-red-dark bg-danger text-white"
						onClick={handleDeleteTransaction}
						disabled={loading}
					>
						Remover
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
