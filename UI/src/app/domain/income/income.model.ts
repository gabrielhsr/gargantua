import { Movement } from "../movement/movement.model";

export class Income extends Movement {
    public paymentDate: Date = new Date();
    public displayPaymentDate: Date = new Date();
    public payer: string = '';
}


