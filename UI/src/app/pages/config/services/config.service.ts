import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEndpoint } from 'src/app/domain/category/category.endpoint';
import { PaymentMethodEndpoint } from 'src/app/domain/paymentMethod/paymentMethod.endpoint';
import { PaymentMethod } from 'src/app/domain/paymentMethod/paymentMethod.model';
import { UpdateService } from 'src/app/shared/services/update.service';
import { PaymentMethodDialogComponent } from '../components/payment-method-dialog/payment-method-dialog.component';

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	constructor(
		private readonly categoryEndpoint: CategoryEndpoint,
		private readonly paymentMethodEndpoint: PaymentMethodEndpoint,
		private readonly dialog: MatDialog,
		private readonly update: UpdateService
	) {}

	public getAllCategories() {
		return this.update.handle(this.categoryEndpoint.get());
	}

	public getAllPaymentMethods() {
		return this.update.handle(this.paymentMethodEndpoint.get());
	}

	public openPaymentMethodDialog(paymentMethod: PaymentMethod) {
		this.dialog.open(PaymentMethodDialogComponent, { data: paymentMethod, panelClass: ['responsive-dialog'] })
	}
}
