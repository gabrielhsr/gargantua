import { Movement } from "../movement/movement.model";
import { Category } from "../category/category.model";
import { PaymentMethod } from "../paymentMethod/paymentMethod.model";

export class Expense extends Movement {
	purchaseDate: Date = new Date();
	dueDate: Date | null = null;
	category: Category | null = null;
	paymentMethod: PaymentMethod | null = null;
}

export class PaidExpense {
	id: string = "00000000-0000-0000-0000-000000000000";
	paid: boolean = false;
}
