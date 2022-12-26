import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { PaymentMethod } from './paymentMethod.model';

@Injectable({
	providedIn: 'root',
})
export class PaymentMethodEndpoint extends BaseEndpoint<PaymentMethod> {
	public override endpoint = '/api/PaymentMethod';

	constructor(private readonly client: HttpClient, private readonly service: HttpService) {
		super(client, service);
	}
}
