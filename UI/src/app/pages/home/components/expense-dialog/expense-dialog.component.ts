import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/entities/category/category.model';
import { Expense } from 'src/app/entities/expense/expense.model';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ExpenseService } from '../../services/expense.service';

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
		@Inject(MAT_DIALOG_DATA) public expense: Expense,
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
		this.createForm(this.expense ?? new Expense());
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

	public compareSelect(category1: Category | PaymentMethod, category2: Category | PaymentMethod) {
		return category1?.id === category2?.id;
	}

	private createForm(expense: Expense): void {
		const formsControl = FormHelper.build({
			object: expense,
			allValidators: {
				validators: [Validators.required],
				exclude: ['dueDate'],
			}
		});

		this.newExpenseForm = new FormGroup(formsControl);
	}
}
