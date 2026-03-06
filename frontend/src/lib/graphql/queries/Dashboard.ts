import { gql } from "@apollo/client";

export const DASHBOARD_VALUES = gql`
	query Dashboard {
		dashboard {
			monthlyExpense
			monthlyIncome
			topCategory {
				id
				title
				totalTransactions
			}
			totalBalance
			totalCategories
			totalTransactions
		}
	}
`;
