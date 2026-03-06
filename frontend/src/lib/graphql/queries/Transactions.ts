import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
	query GetTransaction($getTransactionId: String!) {
		getTransaction(id: $getTransactionId) {
			id
			amount
			type
			description
			date
			createdAt
			updatedAt
			userId
			user {
				id
				name
				email
			}
			categoryId
			category {
				id
				icon
				color
				title
			}
		}
	}
`;

export const LIST_TRANSACTION = gql`
	query ListTransactions($filters: TransactionFilterInput) {
		listTransactions(filters: $filters) {
			id
			description
			amount
			type
			date
			createdAt
			updatedAt
			userId
			user {
				id
				name
				email
			}
			categoryId
			category {
				id
				icon
				color
				title
			}
		}
	}
`;
