import {
	BaggageClaim,
	BookOpen,
	BriefcaseBusiness,
	CarFrontIcon,
	Dumbbell,
	Gift,
	HeartPulse,
	House,
	Mailbox,
	PawPrint,
	PiggyBank,
	ReceiptText,
	ShoppingCart,
	Ticket,
	ToolCase,
	Utensils,
} from "lucide-react";

export const iconsMap = {
	briefcase: BriefcaseBusiness,
	car: CarFrontIcon,
	heart: HeartPulse,
	piggy: PiggyBank,
	cart: ShoppingCart,
	ticket: Ticket,
	tool: ToolCase,
	food: Utensils,
	pet: PawPrint,
	home: House,
	gift: Gift,
	gym: Dumbbell,
	book: BookOpen,
	baggage: BaggageClaim,
	mail: Mailbox,
	receipt: ReceiptText,
} as const;

export type IconName = keyof typeof iconsMap;
