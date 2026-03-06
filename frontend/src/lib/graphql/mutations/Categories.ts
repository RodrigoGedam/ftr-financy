import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
	mutation CreateCategory($data: CreateCategoryInput!) {
		createCategory(data: $data) {
			id
			title
			description
			color
			icon
			userId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_CATEGORY = gql`
	mutation UpdateCategory(
		$data: UpdateCategoryInput!
		$updateCategoryId: String!
	) {
		updateCategory(data: $data, id: $updateCategoryId) {
			id
			title
			color
			icon
			description
			createdAt
			updatedAt
		}
	}
`;

export const DELETE_CATEGORY = gql`
	mutation DeleteCategory($deleteCategoryId: String!) {
		deleteCategory(id: $deleteCategoryId)
	}
`;
