import { BaseEntity } from "../base.model";

export class PaymentMethod extends BaseEntity {
	name: string = '';
}

export interface PaymentMethodDto {
	id: string;
	name: string;
}
