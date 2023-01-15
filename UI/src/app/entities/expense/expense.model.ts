import { BaseEntity } from "../base.model";
import { Category } from "../category/category.model";
import { PaymentMethod } from "../paymentMethod/paymentMethod.model";

export class Expense extends BaseEntity {
	description: string = '';
	purchaseDate: Date = new Date();
	dueDate: Date | null = null;
	amount: number | null = null;
	category: Category | null = null;
	paymentMethod: PaymentMethod | null = null;
}
