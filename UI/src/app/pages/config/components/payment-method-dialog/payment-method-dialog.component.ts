import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { PaymentMethodEndpoint } from 'src/app/entities/paymentMethod/paymentMethod.endpoint';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { UpdateService } from 'src/app/shared/services/update.service';

@Component({
	selector: 'app-payment-method-dialog',
	templateUrl: './payment-method-dialog.component.html',
	styleUrls: ['./payment-method-dialog.component.scss'],
})
export class PaymentMethodDialogComponent implements OnInit, OnDestroy {
	public paymentMethodForm?: FormGroup;
	public loading: boolean = false;

	private destroy = new Subject();

	constructor(
		@Inject(MAT_DIALOG_DATA) public paymentMethod: PaymentMethod,
		private readonly dialogRef: MatDialogRef<PaymentMethodDialogComponent>,
		private readonly paymentMethodEndpoint: PaymentMethodEndpoint,
		private readonly feedback: FeedbackService,
		private readonly update: UpdateService
	) {	}

	public ngOnInit(): void {
		this.createForm(this.paymentMethod);
	}

	public ngOnDestroy(): void {
		this.destroy.next(null);
		this.destroy.complete();
	}

	public showErrorMessage(input: string) {
		if (this.paymentMethodForm) {
			return FormHelper.showErrorMessage(input, this.paymentMethodForm);
		}

		throw 'Form not initialized!';
	}

	public submitForm(): void {
		this.loading = true;

		const formValue = this.paymentMethodForm?.value as PaymentMethod;

		this.paymentMethodEndpoint.put(formValue, formValue.id)
			.pipe(takeUntil(this.destroy))
			.subscribe(({ isSuccess }) => {
				if (isSuccess) {
					this.feedback.successToast("Feedback.SaveSuccess");
					this.dialogRef.close();
					this.update.run();
				}

				this.loading = false;
			});
	}

	private createForm(paymentMethod: PaymentMethod): void {
		const formsControl = FormHelper.build(paymentMethod, {
			allValidators: {
				validators: [Validators.required],
				exclude: ['dueDate', 'bank'],
			}
		});

		this.paymentMethodForm = new FormGroup(formsControl);
	}
}
