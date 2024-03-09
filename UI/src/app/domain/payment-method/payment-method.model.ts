import { BaseEntity } from '../base.model';

export class PaymentMethod extends BaseEntity {
    public name: string | null = null;
    public bank?: string;
    public dueDate?: number;
}
