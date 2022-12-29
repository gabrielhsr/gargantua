import { BaseEntity } from "../base.model";
import { Category } from "../category/category.model";
import { PaymentMethod } from "../paymentMethod/paymentMethod.model";

export class Expense extends BaseEntity {
	description: string = '';
	purchaseDate: Date = new Date();
	dueDate: Date = new Date();
	amount: number = 0;
	category: Category = new Category();
	paymentMethod: PaymentMethod = new PaymentMethod();
}
