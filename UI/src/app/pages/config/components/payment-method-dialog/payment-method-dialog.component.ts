import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';

@Component({
	selector: 'app-payment-method-dialog',
	templateUrl: './payment-method-dialog.component.html',
	styleUrls: ['./payment-method-dialog.component.scss'],
})
export class PaymentMethodDialogComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public paymentMethod: PaymentMethod,
		private readonly dialogRef: MatDialogRef<PaymentMethodDialogComponent>
	) {}

	public ngOnInit(): void {
		console.log(this.paymentMethod);
	}
}
