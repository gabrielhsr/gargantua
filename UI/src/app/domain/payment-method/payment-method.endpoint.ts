import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseEndpoint } from '../base.endpoint';
import { PaymentMethod } from './payment-method.model';

@Injectable({
	providedIn: 'root',
})
export class PaymentMethodEndpoint extends BaseEndpoint<PaymentMethod> {
	public override activator: PaymentMethod = new PaymentMethod();

	constructor(private readonly client: HttpClient) {
		super(client, 'api/PaymentMethod');
	}
}
