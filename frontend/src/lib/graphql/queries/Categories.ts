import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
	query GetCategory($getCategoryId: String!) {
		getCategory(id: $getCategoryId) {
			id
			title
			description
			color
			icon
			createdAt
			updatedAt
			userId
			user {
				id
				name
				email
			}
			transactions {
				id
				amount
				categoryId
				category {
					icon
					color
				}
			}
		}
	}
`;

export const LIST_CATEGORIES = gql`
	query ListCategories {
		listCategories {
			id
			title
			description
			icon
			color
			createdAt
			updatedAt
			userId
			user {
				id
				name
				email
			}
			transactions {
				id
				amount
				type
				categoryId
				category {
					id
					icon
					color
				}
			}
		}
	}
`;

export const CATEGORIES_WITH_STATS = gql`
	query CategoriesWithStats {
		categoriesWithStats {
			id
			title
			color
			icon
			totalTransactions
			totalAmount
		}
	}
`;
