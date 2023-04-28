import { Movement } from "../movement/movement.model";

export class Income extends Movement {
	paymentDate: Date = new Date();
	payer: string = '';
	monthInterval: number = 1;
}


