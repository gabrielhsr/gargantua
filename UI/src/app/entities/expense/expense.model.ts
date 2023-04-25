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
	installments: number = 1;
	periodic: boolean = false;
	paid: boolean = false;
}

export class PaidExpense {
	id: string = "00000000-0000-0000-0000-000000000000";
	paid: boolean = false;
}
