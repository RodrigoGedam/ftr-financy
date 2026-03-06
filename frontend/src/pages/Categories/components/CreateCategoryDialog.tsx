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
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/Categories";
import {
	CATEGORIES_WITH_STATS,
	LIST_CATEGORIES,
} from "@/lib/graphql/queries/Categories";
import { DASHBOARD_VALUES } from "@/lib/graphql/queries/Dashboard";
import { LIST_TRANSACTION } from "@/lib/graphql/queries/Transactions";
import { cn } from "@/lib/utils";
import type { CategoryColor, IconName } from "@/types";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreated?: () => void;
};

const icons = Object.entries(iconsMap);

const colors = Object.entries(categoryColors);

export const CreateCategoryDialog = ({
	open,
	onOpenChange,
	onCreated,
}: Props) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedIcon, setSelectedIcon] = useState<IconName>("briefcase");
	const [selectedColor, setSelectedColor] = useState<CategoryColor>("blue");

	const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
		refetchQueries: [
			{ query: LIST_TRANSACTION },
			{ query: LIST_CATEGORIES },
			{ query: DASHBOARD_VALUES },
			{ query: CATEGORIES_WITH_STATS },
		],
		awaitRefetchQueries: true,
		onCompleted() {
			toast.success("Categoria criada com sucesso!");
			onCreated?.();
			handleClose();
		},
		onError() {
			toast.error("Falha ao criar a categoria");
		},
	});

	const handleCreateCategory = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();

		if (!title.trim()) {
			toast.error("O título é obrigatório");
			return;
		}

		createCategory({
			variables: {
				data: {
					title,
					description,
					color: selectedColor,
					icon: selectedIcon,
				},
			},
		});
	};

	const handleClose = () => {
		setTitle("");
		setDescription("");
		setSelectedIcon("briefcase");
		setSelectedColor("blue");
		onOpenChange(false);
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
						Nova categoria
					</DialogTitle>
					<DialogDescription className="text-gray-600">
						Organize suas transações com categorias
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleCreateCategory} className="space-y-4">
					<div className="space-y-2">
						<Label className="text-gray-700 has-focus:text-brand-base">
							Título
							<Input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="placeholder:text-gray-400 text-gray-800 border border-rounded border-gray-300 mt-1 [&:not(:placeholder-shown):not(:focus)]:text-gray-800"
								placeholder="Ex. Alimentação"
							/>
						</Label>
					</div>

					<div className="space-y-2">
						<Label className="text-gray-700 has-focus:text-brand-base">
							Descrição
							<Input
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="placeholder:text-gray-400 text-gray-800 border border-rounded border-gray-300 mt-1 [&:not(:placeholder-shown):not(:focus)]:text-gray-800"
								placeholder="Descrição da categoria"
							/>
						</Label>
						<p className="text-gray-500 text-[10px]">Opcional</p>
					</div>

					<div className="space-y-2">
						<Label className="text-gray-700">Ícone</Label>
						<div className="grid grid-cols-8 gap-2">
							{icons.map(([name, Icon]) => (
								<button
									key={name}
									type="button"
									onClick={() =>
										setSelectedIcon(name as IconName)
									}
									className={cn(
										"h-10 w-10 flex items-center justify-center rounded-md border transition cursor-pointer",
										selectedIcon === name
											? "border-brand-base"
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
										"flex items-center justify-center border rounded-md w-full py-1 cursor-pointer",
										selectedColor === name
											? "border-brand-base"
											: "border-gray-300",
									)}
								>
									<button
										key={name}
										type="button"
										onClick={() =>
											setSelectedColor(
												name as CategoryColor,
											)
										}
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
						{loading ? "Salvando..." : "Salvar"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
