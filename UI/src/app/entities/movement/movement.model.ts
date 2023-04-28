import { BaseEntity } from "../base.model";

export class Movement extends BaseEntity {
	description: string = '';
	displayDescription: string = '';
	amount: number | null = null;
	periodic: boolean = false;
	recurrentId: string | null = null;
	installments: number = 1;
}
