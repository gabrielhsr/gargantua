import { BaseEntity } from '../base.model';

export class PaymentMethod extends BaseEntity {
    public Name: string | null = null;

    constructor(name?: string) {
        super();

        this.Name = name ?? null;
    }
}
