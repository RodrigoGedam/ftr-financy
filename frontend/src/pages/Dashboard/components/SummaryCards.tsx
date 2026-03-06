import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardData } from "@/types";
import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";

interface SummaryCardsProps {
	dashboard: DashboardData | undefined;
}

export const SummaryCards = ({ dashboard }: SummaryCardsProps) => {
	const totalBalance = dashboard?.totalBalance ?? 0;
	const monthlyIncome = dashboard?.monthlyIncome ?? 0;
	const monthlyExpense = dashboard?.monthlyExpense ?? 0;

	return (
		<div className="grid gap-6 md:grid-cols-3">
			<Card className="border border-gray-200 bg-white">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 font-medium text-gray-500">
						<Wallet className="text-purple-base" />
						SALDO TOTAL
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold text-gray-800">
						R$ {totalBalance}
					</p>
				</CardContent>
			</Card>

			<Card className="border border-gray-200 bg-white">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 font-medium text-gray-500">
						<CircleArrowUp className="text-green-base" />
						RECEITAS DO MÊS
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold text-gray-800">
						R$ {monthlyIncome}
					</p>
				</CardContent>
			</Card>

			<Card className="border border-gray-200 bg-white">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 font-medium text-gray-500">
						<CircleArrowDown className="text-red-base" />
						DESPESAS DO MÊS
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold text-gray-800">
						R$ {monthlyExpense}
					</p>
				</CardContent>
			</Card>
		</div>
	);
};
