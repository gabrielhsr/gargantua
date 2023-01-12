import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/entities/category/category.model';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { Income } from 'src/app/entities/income/income.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { IncomeService } from '../../services/income.service';

@Component({
	selector: 'income-dialog',
	templateUrl: './income-dialog.component.html',
	styleUrls: ['./income-dialog.component.scss'],

})
export class IncomeDialogComponent implements OnInit {
	public newIncomeForm?: FormGroup;
	public loading: boolean = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public income: Income,
		private readonly dialogRef: MatDialogRef<IncomeDialogComponent>,
		private readonly homeService: IncomeService,
		private readonly feedback: FeedbackService
	) {}

	public ngOnInit(): void {
		this.createForm(this.income ?? new Income());
	}

	public submitForm(): void {
		this.loading = true;
		const formValue = this.newIncomeForm?.value as Income;

		this.homeService.saveIncome(formValue).subscribe((response) => {
			if (response.isSuccess) {
				this.feedback.successToast("Feedback.SaveSuccess");
				this.dialogRef.close();
			}

			this.loading = false;
		});
	}

	public showErrorMessage(input: string) {
		if (this.newIncomeForm) {
			return FormHelper.showErrorMessage(input, this.newIncomeForm);
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
				exclude: ['dueDate'],
			}
		});

		this.newIncomeForm = new FormGroup(formsControl);
	}
}
