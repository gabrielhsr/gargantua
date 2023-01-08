import { BaseEntity } from "../base.model";

export class Revenue extends BaseEntity {
	description: string = '';
	paymentDate: Date = new Date();
	amount: number | null = null;
	periodic: boolean = false;
}
