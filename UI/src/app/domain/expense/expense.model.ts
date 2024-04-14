import { BaseEntity, Guid } from '../base.model';
import { Category } from '../category/category.model';
import { PaymentMethod } from '../payment-method/payment-method.model';

export class Expense extends BaseEntity {
    public IdCategory: string = Guid.default;
    public IdPaymentMethod: string = Guid.default;

    public Amount: number = 0;
    public Description: string = '';
    public DueDate: Date | null = null;
    public PurchaseDate: Date = new Date();
    
    public Category: Category | null = null;
    public PaymentMethod: PaymentMethod | null = null;
}
