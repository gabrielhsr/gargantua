import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Expense } from 'src/app/entities/expense/expense.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ExpenseService } from '../../../../shared/services/expense.service';

@Component({
	selector: 'app-add-dialog',
	templateUrl: './add-dialog.component.html',
	styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
	public categories = this.homeService.getCategories();
	public paymentMethods = this.homeService.getPaymentMethods();

	public newExpenseForm!: FormGroup;

	public submitLoading: boolean = false;

	constructor(
		private readonly dialogRef: MatDialogRef<AddDialogComponent>,
		private readonly homeService: ExpenseService,
		private readonly feedBack: FeedbackService
	) {}

	public ngOnInit(): void {
		this.createForm(new Expense());
	}

	public submitForm(): void {
		this.submitLoading = true;
		const formValue = this.newExpenseForm.value as Expense;

		this.homeService
			.saveExpense(formValue)
			.subscribe((response) => {
				if (response.isSuccess) this.feedBack.successToast();
				this.dialogRef.close()
			});
	}

	private createForm(expense: Expense): void {
		const formsControl = FormHelper.build({ object: expense, exclude: ['id'] });

		this.newExpenseForm = new FormGroup(formsControl);
	}
}
