import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/entities/category/category.model';
import { Expense } from 'src/app/entities/expense/expense.model';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ExpenseService } from '../../../../shared/services/expense.service';

@Component({
	selector: 'app-expense-dialog',
	templateUrl: './expense-dialog.component.html',
	styleUrls: ['./expense-dialog.component.scss'],
})
export class ExpenseDialogComponent implements OnInit {
	public categories?: Category[];
	public paymentMethods?: PaymentMethod[];

	public newExpenseForm?: FormGroup;
	public loading: boolean = true;

	constructor(
		private readonly dialogRef: MatDialogRef<ExpenseDialogComponent>,
		private readonly homeService: ExpenseService,
		private readonly feedback: FeedbackService
	) {
		forkJoin({
			categories: this.homeService.getCategories(),
			paymentMethods: this.homeService.getPaymentMethods(),
		}).subscribe(({ categories, paymentMethods }) => {
			if (categories.isSuccess && paymentMethods.isSuccess) {
				this.categories = categories.value;
				this.paymentMethods = paymentMethods.value;

				this.loading = false;
			}
		});
	}

	public ngOnInit(): void {
		this.createForm(new Expense());
	}

	public submitForm(): void {
		this.loading = true;
		const formValue = this.newExpenseForm?.value as Expense;

		this.homeService.saveExpense(formValue).subscribe((response) => {
			if (response.isSuccess) {
				this.feedback.successToast("Feedback.SaveSuccess");
				this.dialogRef.close();
			}

			this.loading = false;
		});
	}

	public showErrorMessage(input: string) {
		if (this.newExpenseForm) {
			return FormHelper.showErrorMessage(input, this.newExpenseForm);
		}

		throw 'Form not initialized!';
	}

	private createForm(expense: Expense): void {
		const formsControl = FormHelper.build({
			object: expense,
			exclude: ['id'],
			allValidators: {
				validators: [Validators.required],
				exclude: ['dueDate'],
			}
		});

		this.newExpenseForm = new FormGroup(formsControl);
	}
}
