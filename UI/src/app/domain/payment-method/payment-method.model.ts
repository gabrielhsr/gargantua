import { BaseEntity } from '../base.model';

export class PaymentMethod extends BaseEntity {
    public Name: string | null = null;
    public Bank?: string;
    public DueDate?: number;
}
