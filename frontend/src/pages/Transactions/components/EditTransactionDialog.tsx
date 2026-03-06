import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UPDATE_TRANSACTION } from "@/lib/graphql/mutations/Transactions";
import {
	CATEGORIES_WITH_STATS,
	LIST_CATEGORIES,
} from "@/lib/graphql/queries/Categories";
import { DASHBOARD_VALUES } from "@/lib/graphql/queries/Dashboard";
import { LIST_TRANSACTION } from "@/lib/graphql/queries/Transactions";
import { cn } from "@/lib/utils";
import type { Category, Transaction } from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	transaction: Transaction | null;
};

export const EditTransactionDialog = ({
	open,
	onOpenChange,
	transaction,
}: Props) => {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState<string>("");
	const [type, setType] = useState<"expense" | "income">("expense");
	const [categoryId, setCategoryId] = useState<string>("");
	const [date, setDate] = useState<Date | undefined>();

	const { data: categoriesData } = useQuery<{
		listCategories: Category[];
	}>(LIST_CATEGORIES);

	const categoriesAvailable = categoriesData?.listCategories ?? [];

	const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
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
		if (transaction && open) {
			setDescription(transaction.description);
			setAmount((transaction.amount / 100).toString());
			setType(transaction.type);
			setCategoryId(transaction.categoryId);
			setDate(new Date(transaction.date));
		}
	}, [transaction, open]);

	const handleUpdateTransaction = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();

		if (!transaction?.id || !date) return;

		await updateTransaction({
			variables: {
				updateTransactionId: transaction.id,
				data: {
					description,
					amount: Math.round(Number(amount) * 100), // converter para centavos
					type,
					date: date.toISOString(),
					categoryId,
				},
			},
		});
	};

	const handleClose = () => {
		setAmount("");
		setDescription("");
		setType("expense");
		setCategoryId("");
		setDate(undefined);
		onOpenChange(false);
	};

	const isValid =
		description.trim() &&
		amount &&
		Number(amount) > 0 &&
		date &&
		categoryId;

	const isDirty =
		description !== transaction?.description ||
		Number(amount) !== transaction?.amount / 100 ||
		type !== transaction?.type ||
		categoryId !== transaction?.categoryId ||
		date?.toISOString() !== transaction?.date;

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				if (!isOpen) handleClose();
			}}
		>
			<DialogContent
				className="sm:max-w-106.25 bg-white border border-gray-200"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle className="text-gray-800 font-semibold text-[16px]">
						Editar transação
					</DialogTitle>
					<DialogDescription className="text-gray-600">
						Registre sua despesa ou receita
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleUpdateTransaction} className="space-y-4">
					<div className="border border-gray-200 rounded-xl p-2">
						<Tabs
							value={type}
							onValueChange={(value) =>
								setType(value as "expense" | "income")
							}
						>
							<TabsList className="grid grid-cols-2 gap-2 w-full">
								<TabsTrigger
									className="gap-2 bg-gray-100 cursor-pointer border data-[state=inactive]:border-none data-[state=inactive]:text-gray-600 data-[state=active]:border-red-base data-[state=active]:text-red-base"
									value="expense"
								>
									<CircleArrowDown className="h-4 w-4" />
									Despesa
								</TabsTrigger>
								<TabsTrigger
									className="gap-2 bg-gray-100 cursor-pointer border data-[state=inactive]:border-none data-[state=inactive]:text-gray-600 data-[state=active]:border-green-base data-[state=active]:text-green-base"
									value="income"
								>
									<CircleArrowUp className="h-4 w-4" />
									Receita
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<div className="space-y-2">
						<Label className="text-gray-700">Descrição</Label>
						<Input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="text-gray-400 border border-rounded border-gray-300 mt-1"
							placeholder="Ex. Almoço no restaurante"
						/>
					</div>

					<div className="flex items-center justify-evenly gap-4">
						<div className="space-y-2 flex flex-col w-full">
							<Label className="text-gray-700">Data</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"justify-start text-left border border-gray-300",
											!date &&
												"text-muted-foreground text-gray-400",
										)}
									>
										{date
											? format(date, "dd/MM/yyyy", {
													locale: ptBR,
												})
											: "Selecione"}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-full p-2 bg-white">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										locale={ptBR}
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="space-y-2 flex flex-col w-full">
							<Label className="text-gray-700">Valor</Label>
							<div className="relative">
								<span className="absolute left-3 top-2.5 text-sm text-muted-foreground text-black">
									R$
								</span>
								<Input
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									type="number"
									step="0.01"
									className="pl-10 border border-gray-300 text-black"
									placeholder="0,00"
								/>
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<Label className="text-gray-700">Categoria</Label>
						<Select
							value={categoryId}
							onValueChange={setCategoryId}
						>
							<SelectTrigger className="cursor-pointer mt-1 text-gray-400">
								<SelectValue placeholder="Selecione" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								{categoriesAvailable &&
								categoriesAvailable.length > 0 ? (
									categoriesAvailable.map((category) => (
										<SelectItem
											key={category.id}
											className="hover:bg-gray-200"
											value={category.id}
										>
											{category.title}
										</SelectItem>
									))
								) : (
									<SelectItem
										className="hover:bg-gray-200"
										value="empty"
										disabled
									>
										Sem categorias criadas
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</div>

					<Button
						variant="brand"
						disabled={!isDirty || !isValid || loading}
						className="w-fullpy-6 font-medium"
					>
						{loading ? "Salvando..." : "Salvar alterações"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
