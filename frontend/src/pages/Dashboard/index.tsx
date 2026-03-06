import { Page } from "@/components/Page";
import { CATEGORIES_WITH_STATS } from "@/lib/graphql/queries/Categories";
import { DASHBOARD_VALUES } from "@/lib/graphql/queries/Dashboard";
import { LIST_TRANSACTION } from "@/lib/graphql/queries/Transactions";
import type { CategoryWithStats, DashboardData, Transaction } from "@/types";
import { useQuery } from "@apollo/client/react";
import { CategoriesList } from "./components/CategoriesList";
import { SummaryCards } from "./components/SummaryCards";
import { TransactionsList } from "./components/TransactionsList";

export const Dashboard = () => {
	const {
		data: dashboardData,
		loading: dashboardLoading,
		error: dashboardError,
	} = useQuery<{ dashboard: DashboardData }>(DASHBOARD_VALUES, {
		fetchPolicy: "network-only",
	});

	const {
		data: categoriesData,
		loading: categoriesLoading,
		error: categoriesError,
	} = useQuery<{ categoriesWithStats: CategoryWithStats[] }>(
		CATEGORIES_WITH_STATS,
		{
			fetchPolicy: "network-only",
		},
	);

	const {
		data: transactionData,
		loading: transactionLoading,
		error: transactionError,
		refetch,
	} = useQuery<{ listTransactions: Transaction[] }>(LIST_TRANSACTION);

	if (dashboardLoading || categoriesLoading || transactionLoading)
		return <p>Carregando...</p>;
	if (dashboardError || categoriesError || transactionError)
		return <p>Erro ao carregar dashboard</p>;

	const dashboard = dashboardData?.dashboard;
	const categories = categoriesData?.categoriesWithStats;
	const transactions = transactionData?.listTransactions;

	return (
		<Page>
			<div className="mx-auto w-full space-y-6">
				<SummaryCards dashboard={dashboard} />
				<div className="grid gap-6 md:grid-cols-3">
					<div className="md:col-span-2">
						<TransactionsList
							transactions={transactions}
							onCreated={refetch}
						/>
					</div>
					<div>
						<CategoriesList categories={categories} />
					</div>
				</div>
			</div>
		</Page>
	);
};
