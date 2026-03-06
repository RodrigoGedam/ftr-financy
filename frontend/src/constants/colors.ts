export const categoryColors = {
	blue: {
		bgBase: "bg-blue-base",
		bgLight: "bg-blue-light",
		textBase: "text-blue-base",
		textDark: "text-blue-dark",
	},
	red: {
		bgBase: "bg-red-base",
		bgLight: "bg-red-light",
		textBase: "text-red-base",
		textDark: "text-red-dark",
	},
	green: {
		bgBase: "bg-green-base",
		bgLight: "bg-green-light",
		textBase: "text-green-base",
		textDark: "text-green-dark",
	},
	purple: {
		bgBase: "bg-purple-base",
		bgLight: "bg-purple-light",
		textBase: "text-purple-base",
		textDark: "text-purple-dark",
	},
	pink: {
		bgBase: "bg-pink-base",
		bgLight: "bg-pink-light",
		textBase: "text-pink-base",
		textDark: "text-pink-dark",
	},
	yellow: {
		bgBase: "bg-yellow-base",
		bgLight: "bg-yellow-light",
		textBase: "text-yellow-base",
		textDark: "text-yellow-dark",
	},
	orange: {
		bgBase: "bg-orange-base",
		bgLight: "bg-orange-light",
		textBase: "text-orange-base",
		textDark: "text-orange-dark",
	},
} as const;

export type CategoryColor = keyof typeof categoryColors;
