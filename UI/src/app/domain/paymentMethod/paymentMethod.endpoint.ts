import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { PaymentMethod } from './paymentMethod.model';

@Injectable({
	providedIn: 'root',
})
export class PaymentMethodEndpoint extends BaseEndpoint<PaymentMethod> {
	constructor(private readonly service: HttpService) {
		super(service, '/api/PaymentMethod/');
	}
}
