import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export const TransactionsFilters = () => {
	return (
		<Card className="bg-white border border-gray-300">
			<CardContent className="grid gap-4 p-4 md:grid-cols-4">
				<div className="flex flex-col space-y-2">
					<p className="font-medium text-[14px] text-gray-700">
						Buscar
					</p>
					<div className="relative w-full border border-gray-300 rounded-md">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground text-gray-400" />

						<Input
							placeholder="Buscar por descrição"
							className="pl-9 border-none"
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-2">
					<p className="font-medium text-[14px] text-gray-700">
						Tipo
					</p>
					<Select>
						<SelectTrigger className="p-5">
							<SelectValue placeholder="Todos" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="income">Entrada</SelectItem>
							<SelectItem value="expense">Saída</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-col space-y-2">
					<p className="font-medium text-[14px] text-gray-700">
						Categoria
					</p>
					<Select>
						<SelectTrigger className="p-5">
							<SelectValue placeholder="Todas" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="all">Todas</SelectItem>
							<SelectItem value="food">Alimentação</SelectItem>
							<SelectItem value="rent">Aluguel</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-col space-y-2">
					<p className="font-medium text-[14px] text-gray-700">
						Período
					</p>
					<Select>
						<SelectTrigger className="p-5">
							<SelectValue placeholder="Período" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="11-2025">
								Novembro / 2025
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
};
