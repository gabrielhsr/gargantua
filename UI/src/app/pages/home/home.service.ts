import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryEndpoint } from 'src/app/entities/category/category.endpoint';
import { CategoryDto } from 'src/app/entities/category/category.model';
import { PaymentMethodEndpoint } from 'src/app/entities/paymentMethod/paymentMethod.endpoint';
import { PaymentMethodDto } from 'src/app/entities/paymentMethod/paymentMethod.model';

@Injectable({
	providedIn: 'root',
})
export class HomeService {
	constructor(
		private categoryEndpoint: CategoryEndpoint,
		private paymentMethodEndpoint: PaymentMethodEndpoint
	) {}

	public getCategories(): Observable<CategoryDto[]> {
		return this.categoryEndpoint.get();
	}

	public getPaymentMethods(): Observable<PaymentMethodDto[]> {
		return this.paymentMethodEndpoint.get();
	}
}

