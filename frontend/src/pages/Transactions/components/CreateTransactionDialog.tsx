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
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/Transactions";
import {
	CATEGORIES_WITH_STATS,
	LIST_CATEGORIES,
} from "@/lib/graphql/queries/Categories";
import { DASHBOARD_VALUES } from "@/lib/graphql/queries/Dashboard";
import { LIST_TRANSACTION } from "@/lib/graphql/queries/Transactions";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreated?: () => void;
};

export const CreateTransactionDialog = ({
	open,
	onOpenChange,
	onCreated,
}: Props) => {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState<string>("");
	const [type, setType] = useState<"expense" | "income">("expense");
	const [categoryId, setCategoryId] = useState<string>("");
	const [date, setDate] = useState<Date | undefined>();

	const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
		refetchQueries: [
			{ query: LIST_TRANSACTION },
			{ query: LIST_CATEGORIES },
			{ query: DASHBOARD_VALUES },
			{ query: CATEGORIES_WITH_STATS },
		],
		awaitRefetchQueries: true,
		onCompleted() {
			toast.success("Transação criada com sucesso!");
			onCreated?.();
			handleClose();
		},
		onError() {
			toast.error("Falha ao criar a transação");
		},
	});

	const { data: categoriesData } = useQuery<{
		listCategories: Category[];
	}>(LIST_CATEGORIES);

	const categoriesAvailable = categoriesData?.listCategories ?? [];

	const handleCreateTransaction = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();

		if (!date) {
			toast.error("Selecione uma data");
			return;
		}

		if (!categoryId) {
			toast.error("Selecione uma categoria");
			return;
		}
		createTransaction({
			variables: {
				data: {
					description,
					amount: Number(amount),
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
						Nova transação
					</DialogTitle>
					<DialogDescription className="text-gray-600">
						Registre sua despesa ou receita
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleCreateTransaction} className="space-y-4">
					<div className="border border-gray-200 rounded-xl p-2">
						<Tabs
							value={type}
							onValueChange={(value) =>
								setType(value as "expense" | "income")
							}
						>
							<TabsList className="grid grid-cols-2 gap-2 w-full">
								<TabsTrigger
									className="gap-2 data-[state=active]:bg-gray-100 cursor-pointer border data-[state=inactive]:border-none data-[state=inactive]:text-gray-600 data-[state=active]:border-red-base data-[state=active]:text-red-base"
									value="expense"
								>
									<CircleArrowDown className="h-4 w-4" />
									Despesa
								</TabsTrigger>
								<TabsTrigger
									className="gap-2 data-[state=active]:bg-gray-100 cursor-pointer border data-[state=inactive]:border-none data-[state=inactive]:text-gray-600 data-[state=active]:border-green-base data-[state=active]:text-green-base"
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
							className="text-gray-800 placeholder:text-gray-400 border border-rounded border-gray-300 mt-1"
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
							required
							value={categoryId}
							onValueChange={setCategoryId}
						>
							<SelectTrigger className="cursor-pointer mt-1 text-gray-800">
								<SelectValue placeholder="Selecione" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								{categoriesAvailable &&
								categoriesAvailable.length > 0 ? (
									categoriesAvailable.map((category) => (
										<SelectItem
											key={category.id}
											className={cn(
												"text-[16px] text-gray-800 [&_svg]:text-success hover:bg-gray-100",
												categoryId === category.id
													? "font-medium"
													: "font-normal",
											)}
											value={category.id}
										>
											{category.title}
										</SelectItem>
									))
								) : (
									<SelectItem value="empty" disabled>
										Sem categorias criadas
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</div>

					<Button
						variant="brand"
						disabled={loading}
						className="w-full"
					>
						{loading ? "Salvando..." : "Salvar"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
