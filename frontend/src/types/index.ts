export type TransactionType = "expense" | "income";

export type IconName =
	| "briefcase"
	| "car"
	| "heart"
	| "piggy"
	| "cart"
	| "ticket"
	| "tool"
	| "food"
	| "pet"
	| "home"
	| "gift"
	| "gym"
	| "book"
	| "baggage"
	| "mail"
	| "receipt";

export type CategoryColor =
	| "blue"
	| "red"
	| "green"
	| "purple"
	| "pink"
	| "yellow"
	| "orange";

export interface User {
	id: string;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	transactions?: Transaction[];
	categories?: Category[];
}

export interface Category {
	id: string;
	title: string;
	icon: IconName;
	color: CategoryColor;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
	userId?: string;
	user?: User;
	transactions?: Transaction[];
}

export interface CategoryWithStats {
	id: string;
	title: string;
	icon: IconName;
	color: CategoryColor;
	totalTransactions: number;
	totalAmount: number;
}

export interface Transaction {
	id: string;
	description: string;
	amount: number;
	type: TransactionType;
	date: string;
	createdAt?: string;
	updatedAt?: string;
	userId?: string;
	user?: User;
	categoryId: string;
	category: Category;
}

export interface RegisterInput {
	name: string;
	email: string;
	password: string;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface TopCategory {
	id: string;
	title: string;
	totalTransactions: number;
}

export interface DashboardData {
	monthlyExpense: number;
	monthlyIncome: number;
	topCategory: TopCategory | null;
	totalBalance: number;
	totalCategories: number;
	totalTransactions: number;
}
