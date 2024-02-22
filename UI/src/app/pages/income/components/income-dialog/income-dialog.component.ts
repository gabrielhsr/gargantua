import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { Guid } from 'src/app/domain/base.model';
import { Category } from 'src/app/domain/category/category.model';
import { Income } from 'src/app/domain/income/income.model';
import { PaymentMethod } from 'src/app/domain/paymentMethod/paymentMethod.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { IncomeService } from '../../services/income.service';

@Component({
	selector: 'income-dialog',
	templateUrl: './income-dialog.component.html',
	styleUrls: ['./income-dialog.component.scss'],

})
export class IncomeDialogComponent implements OnInit, OnDestroy {
	public incomeForm?: FormGroup;
	public loading: boolean = false;
	public editMonth: boolean = false;
	public showRecurrentCheck: boolean = true;

	private destroy$ = new Subject<void>();

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { income?: Income, editMonth?: boolean },
		private readonly dialogRef: MatDialogRef<IncomeDialogComponent>,
		private readonly incomeService: IncomeService,
		private readonly feedback: FeedbackService
	) {}

	public ngOnInit(): void {
		this.createForm(this.data.income ?? new Income());
		this.editMonth = this.data.editMonth ?? false;

		if ((this.editMonth || this.incomeForm?.get('recurrentId')?.value)) {
			this.showRecurrentCheck = false;

			this.incomeForm?.patchValue({ paymentDate: this.incomeForm.get('displayPaymentDate')?.value });
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
        this.destroy$.complete();
	}

	public submitForm(): void {
		this.loading = true;

		if (this.editMonth) {
			const recurrentId = this.incomeForm?.get('recurrentId')!;
			const periodicInput = this.incomeForm?.get('periodic')!;
			const id = this.incomeForm?.get('id')!;

			periodicInput.patchValue(false);
			recurrentId.patchValue(id.value);
			id.patchValue(Guid.default);
		}

		const formValue = this.incomeForm?.value as Income;

		if (formValue.periodic) {
			formValue.installments = 1;
		} else {
			formValue.monthInterval = 1;
		}

		// this.incomeService.saveIncome(formValue).pipe(takeUntil(this.destroy$)).subscribe((response) => {
		// 	if (response.isSuccess) {
		// 		this.feedback.successToast("Feedback.SaveSuccess");
		// 		this.dialogRef.close();
		// 	}

		// 	this.loading = false;
		// });
	}

	public showErrorMessage(input: string) {
		if (this.incomeForm) {
			return FormHelper.showErrorMessage(input, this.incomeForm);
		}

		throw 'Form not initialized!';
	}

	public displayFn(category: Category | PaymentMethod) {
		return category?.name ?? '';
	}

	private createForm(income: Income): void {
		const formsControl = FormHelper.build(income, {
			validators: {
				validators: [Validators.required],
				exclude: ['recurrentId', 'displayDescription', 'displayPaymentDate'],
			},
		});

		// this.incomeForm = new FormGroup(formsControl);
	}
}
