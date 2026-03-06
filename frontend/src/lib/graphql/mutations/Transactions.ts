import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
	mutation CreateTransaction($data: CreateTransactionInput!) {
		createTransaction(data: $data) {
			id
			description
			amount
			type
			date
			createdAt
			updatedAt
			userId
			categoryId
			category {
				color
				icon
			}
		}
	}
`;

export const UPDATE_TRANSACTION = gql`
	mutation UpdateTransaction(
		$data: UpdateTransactionInput!
		$updateTransactionId: String!
	) {
		updateTransaction(data: $data, id: $updateTransactionId) {
			id
			description
			amount
			type
			date
			categoryId
			createdAt
			updatedAt
		}
	}
`;

export const DELETE_TRANSACTION = gql`
	mutation DeleteTransaction($deleteTransactionId: String!) {
		deleteTransaction(id: $deleteTransactionId)
	}
`;
