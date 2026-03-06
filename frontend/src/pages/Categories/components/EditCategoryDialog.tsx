import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryColors } from "@/constants/colors";
import { iconsMap } from "@/constants/icons";
import { UPDATE_CATEGORY } from "@/lib/graphql/mutations/Categories";
import {
	CATEGORIES_WITH_STATS,
	LIST_CATEGORIES,
} from "@/lib/graphql/queries/Categories";
import { DASHBOARD_VALUES } from "@/lib/graphql/queries/Dashboard";
import { LIST_TRANSACTION } from "@/lib/graphql/queries/Transactions";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import { useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category: Category | null;
};

const icons = Object.entries(iconsMap);

const colors = Object.entries(categoryColors);

export const EditCategoryDialog = ({ open, onOpenChange, category }: Props) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedIcon, setSelectedIcon] = useState("");
	const [selectedColor, setSelectedColor] = useState("");

	const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
		refetchQueries: [
			{ query: LIST_TRANSACTION },
			{ query: LIST_CATEGORIES },
			{ query: DASHBOARD_VALUES },
			{ query: CATEGORIES_WITH_STATS },
		],
		awaitRefetchQueries: true,
		onCompleted: () => {
			handleClose();
		},
	});

	useEffect(() => {
		if (category && open) {
			setTitle(category.title);
			setDescription(category.description ?? "");
			setSelectedIcon(category.icon);
			setSelectedColor(category.color);
		}
	}, [category, open]);

	const handleClose = () => {
		setTitle("");
		setDescription("");
		setSelectedIcon("briefcase");
		setSelectedColor("blue");
		onOpenChange(false);
	};

	const handleUpdateCategory = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();

		if (!category?.id) return;

		await updateCategory({
			variables: {
				updateCategoryId: category.id,
				data: {
					title,
					description: description || null,
					icon: selectedIcon,
					color: selectedColor,
				},
			},
		});
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				if (!isOpen) handleClose();
			}}
		>
			<DialogContent
				className="sm:max-w-106.25 bg-white w-300 border border-gray-200"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle className="text-gray-800 font-semibold text-[16px]">
						Editar categoria
					</DialogTitle>
					<DialogDescription className="text-gray-600">
						Organize suas transações com categorias
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleUpdateCategory} className="space-y-4">
					<div className="space-y-2">
						<Label className="text-gray-700">Titulo</Label>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="text-gray-400 border border-rounded border-gray-300 mt-1"
							placeholder="Ex. Alimentação"
						/>
					</div>

					<div className="space-y-2">
						<Label className="text-gray-700">Descrição</Label>
						<Input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="text-gray-400 border border-rounded border-gray-300 mt-1"
							placeholder="Descrição da categoria"
						/>
						<p className="text-gray-500 text-[10px]">Opcional</p>
					</div>

					<div className="space-y-2">
						<Label className="text-gray-700">Ícone</Label>
						<div className="grid grid-cols-8 gap-2">
							{icons.map(([name, Icon]) => (
								<button
									key={name}
									type="button"
									onClick={() => setSelectedIcon(name)}
									className={cn(
										"h-10 w-10 flex items-center justify-center rounded-md border transition",
										selectedIcon === name
											? "border-primary bg-muted"
											: "text-gray-500 border-gray-300",
									)}
								>
									<Icon className="h-4 w-4 text-gray-600" />
								</button>
							))}
						</div>
					</div>

					<div className="space-y-2 w-full">
						<Label className="text-gray-700">Cor</Label>
						<div className="flex items-center w-full space-evenly gap-2">
							{colors.map(([name, color]) => (
								<div
									className={cn(
										"flex items-center justify-center border rounded-md w-full py-1",
										selectedColor === name
											? "border-black"
											: "border-gray-300",
									)}
								>
									<button
										key={name}
										type="button"
										onClick={() => setSelectedColor(name)}
										className={cn(
											"h-4 w-10 rounded-sm transition cursor-pointer",
											color.bgBase,
										)}
									/>
								</div>
							))}
						</div>
					</div>

					<Button
						variant="brand"
						disabled={loading}
						className="w-full py-6 font-medium"
					>
						{loading ? "Salvando..." : "Salvar alterações"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
