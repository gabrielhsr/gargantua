import { Guid } from '../base.model';
import { Category } from '../category/category.model';
import { Movement } from '../movement/movement.model';
import { PaymentMethod } from '../payment-method/payment-method.model';

export class Expense extends Movement {
    public PurchaseDate: Date = new Date();
    public DisplayPurchaseDate: Date = new Date();
    public DueDate: Date | null = null;
    public DisplayDueDate: Date | null = null;
    public Category: Category | null = null;
    public PaymentMethod: PaymentMethod | null = null;
}

export class PaidExpense {
    public Id: string = Guid.default;
    public Paid: boolean = false;
}
