import { BaseEntity } from "../base.model";

export class Income extends BaseEntity {
	description: string = '';
	displayDescription: string = '';
	paymentDate: Date = new Date();
	amount: number | null = null;
	periodic: boolean = false;
	recurrentId: string | null = null;
	payer: string = '';
	installments: number = 1;
	monthInterval: number = 1;
}
