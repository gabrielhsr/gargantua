import { Movement } from "../movement/movement.model";

export class Income extends Movement {
	paymentDate: Date = new Date();
	displayPaymentDate: Date = new Date();
	payer: string = '';
}


