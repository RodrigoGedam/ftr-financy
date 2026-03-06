import { CategoryColor, IconName } from "@prisma/client";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {
	@Field(() => String)
	title!: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => CategoryColor)
	color!: CategoryColor;

	@Field(() => IconName)
	icon!: IconName;
}

@InputType()
export class UpdateCategoryInput {
	@Field(() => String, { nullable: true })
	title?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => CategoryColor, { nullable: true })
	color?: CategoryColor;

	@Field(() => IconName, { nullable: true })
	icon?: IconName;
}
