import { BaseEntity } from "../base.model";
import { Category } from "../category/category.model";
import { PaymentMethod } from "../paymentMethod/paymentMethod.model";

export class Expense extends BaseEntity {
	dueDate: Date = new Date();
	purchaseDate: Date = new Date();
	category: Category = new Category();
	paymentMethod: PaymentMethod = new PaymentMethod();
	description: string = '';
	amount: number = 0;
}

export interface ExpenseDto {
	dueDate: Date;
	purchaseDate: Date;
	description: string;
	amount: number;
	categoryName: string;
	paymentMethodName: string;
}
