import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Categories";
import {
	CATEGORIES_WITH_STATS,
	LIST_CATEGORIES,
} from "@/lib/graphql/queries/Categories";
import { DASHBOARD_VALUES } from "@/lib/graphql/queries/Dashboard";
import { LIST_TRANSACTION } from "@/lib/graphql/queries/Transactions";
import type { Category } from "@/types";
import { useMutation } from "@apollo/client/react";

interface DeleteCategoryDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category: Category | null;
}

export const DeleteCategoryDialog = ({
	open,
	onOpenChange,
	category,
}: DeleteCategoryDialogProps) => {
	const [deleteCategoryMutation, { loading }] = useMutation(DELETE_CATEGORY, {
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
	});

	const handleDeleteCategory = async () => {
		if (!category) return;
		await deleteCategoryMutation({
			variables: {
				deleteCategoryId: category.id,
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
					<DialogTitle>Remover Categoria</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-gray-600">
					Tem certeza que deseja remover
					<span className="font-bold text-gray-800">
						{" "}
						{category?.title}{" "}
					</span>
					?
					<p>
						As transações com essa categoria serão deletadas. Altere
						a categoria das transações antes de deletar !
					</p>
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
						onClick={handleDeleteCategory}
						disabled={loading}
					>
						Remover
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
