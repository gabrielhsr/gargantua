import { BaseEntity } from "../base.model";

export class Income extends BaseEntity {
	description: string = '';
	paymentDate: Date = new Date();
	amount: number | null = null;
	periodic: boolean = false;
}
