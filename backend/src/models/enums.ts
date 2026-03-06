import { CategoryColor, IconName, TransactionType } from "@prisma/client";
import { registerEnumType } from "type-graphql";

registerEnumType(TransactionType, {
	name: "TransactionType",
});

registerEnumType(CategoryColor, {
	name: "CategoryColor",
});

registerEnumType(IconName, {
	name: "IconName",
});
