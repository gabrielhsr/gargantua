import { Injectable } from '@angular/core';
import { CategoryEndpoint } from 'src/app/entities/category/category.endpoint';
import { PaymentMethodEndpoint } from 'src/app/entities/paymentMethod/paymentMethod.endpoint';

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	constructor(
		private readonly categoryEndpoint: CategoryEndpoint,
		private readonly paymentMethodEndpoint: PaymentMethodEndpoint
	) {}

	public getAllCategories() {
		return this.categoryEndpoint.get();
	}

	public getAllPaymentMethods() {
		return this.paymentMethodEndpoint.get();
	}
}
