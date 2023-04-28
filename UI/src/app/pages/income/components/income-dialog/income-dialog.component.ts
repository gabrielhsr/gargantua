import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/entities/category/category.model';
import { Income } from 'src/app/entities/income/income.model';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { GuidHelper } from 'src/app/shared/helpers/guid.helper';
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

	private destroy = new Subject();

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
		}
	}

	public ngOnDestroy(): void {
		this.destroy.next(null);
        this.destroy.complete();
	}

	public submitForm(): void {
		this.loading = true;

		if (this.editMonth) {
			const recurrentId = this.incomeForm?.get('recurrentId')!;
			const periodicInput = this.incomeForm?.get('periodic')!;
			const id = this.incomeForm?.get('id')!;

			periodicInput.patchValue(false);
			recurrentId.patchValue(id.value);
			id.patchValue(GuidHelper.default);
		}

		const formValue = this.incomeForm?.value as Income;

		this.incomeService.saveIncome(formValue).pipe(takeUntil(this.destroy)).subscribe((response) => {
			if (response.isSuccess) {
				this.feedback.successToast("Feedback.SaveSuccess");
				this.dialogRef.close();
			}

			this.loading = false;
		});
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
			allValidators: {
				validators: [Validators.required],
				exclude: ['recurrentId', 'displayDescription'],
			},
		});

		this.incomeForm = new FormGroup(formsControl);
	}
}
