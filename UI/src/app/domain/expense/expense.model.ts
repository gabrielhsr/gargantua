import { Movement } from "../movement/movement.model";
import { Category } from "../category/category.model";
import { PaymentMethod } from "../paymentMethod/paymentMethod.model";
import { Guid } from "../base.model";

export class Expense extends Movement {
	purchaseDate: Date = new Date();
	displayPurchaseDate: Date = new Date();
	dueDate: Date | null = null;
	displayDueDate: Date | null = null;
	category: Category | null = null;
	paymentMethod: PaymentMethod | null = null;
}

export class PaidExpense {
	id: string = Guid.default;
	paid: boolean = false;
}
