import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEndpoint } from 'src/app/entities/category/category.endpoint';
import { PaymentMethodEndpoint } from 'src/app/entities/paymentMethod/paymentMethod.endpoint';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { PaymentMethodDialogComponent } from '../components/payment-method-dialog/payment-method-dialog.component';

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	constructor(
		private readonly categoryEndpoint: CategoryEndpoint,
		private readonly paymentMethodEndpoint: PaymentMethodEndpoint,
		private readonly dialog: MatDialog
	) {}

	public getAllCategories() {
		return this.categoryEndpoint.get();
	}

	public getAllPaymentMethods() {
		return this.paymentMethodEndpoint.get();
	}

	public openPaymentMethodDialog(paymentMethod: PaymentMethod) {
		this.dialog.open(PaymentMethodDialogComponent, { data: paymentMethod, panelClass: ['responsive-dialog'] })
	}
}
