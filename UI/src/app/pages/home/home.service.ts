import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryEndpoint } from 'src/app/entities/category/category.endpoint';
import { Category } from 'src/app/entities/category/category.model';
import { PaymentMethodEndpoint } from 'src/app/entities/paymentMethod/paymentMethod.endpoint';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';

@Injectable({
	providedIn: 'root',
})
export class HomeService {
	constructor(
		private categoryEndpoint: CategoryEndpoint,
		private paymentMethodEndpoint: PaymentMethodEndpoint
	) {}

	public getCategories(): Observable<Category[]> {
		return this.categoryEndpoint.get();
	}

	public getPaymentMethods(): Observable<PaymentMethod[]> {
		return this.paymentMethodEndpoint.get();
	}
}

