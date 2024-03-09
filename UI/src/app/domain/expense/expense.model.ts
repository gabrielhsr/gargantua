import { Guid } from '../base.model';
import { Category } from '../category/category.model';
import { Movement } from '../movement/movement.model';
import { PaymentMethod } from '../payment-method/payment-method.model';

export class Expense extends Movement {
    public purchaseDate: Date = new Date();
    public displayPurchaseDate: Date = new Date();
    public dueDate: Date | null = null;
    public displayDueDate: Date | null = null;
    public category: Category | null = null;
    public paymentMethod: PaymentMethod | null = null;
}

export class PaidExpense {
    public id: string = Guid.default;
    public paid: boolean = false;
}
