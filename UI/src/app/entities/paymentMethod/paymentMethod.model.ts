import { BaseEntity } from "../base.model";

export class PaymentMethod extends BaseEntity {
	name: string | null = null;
	bank?: string;
	dueDate?: Date = new Date();
}
