import { Injectable } from '@angular/core';
import { ExpenseEndpoint } from 'src/app/entities/expense/expense.endpoint';
import { Expense } from 'src/app/entities/expense/expense.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { UpdateService } from 'src/app/shared/services/update.service';

@Injectable()
export class ExpensePaidService {
	private checkBoxState: boolean = false;
	private paidExpenses: Expense[] = [];

	constructor(
		private readonly expenseEndpoint: ExpenseEndpoint,
		private readonly feedback: FeedbackService,
		private readonly update: UpdateService
	) {}

	public get showActions(): boolean {
		return this.checkBoxState;
	}

	public get shouldSave(): boolean {
		return this.paidExpenses.length > 0;
	}

	public toggle() {
		this.checkBoxState = !this.checkBoxState;

		if (!this.checkBoxState) this.paidExpenses = [];
	}

	public markAsPaid(check: boolean, expense: Expense) {
		const item = this.paidExpenses.findIndex(paidExpense => paidExpense.id == expense.id);

		expense.paid = check;

		if (item < 0) {
			this.paidExpenses.push(expense);
		} else {
			this.paidExpenses[item] = expense;
		}
	}

	public save() {
		this.expenseEndpoint.markAsPaid(this.paidExpenses).subscribe(({ isSuccess }) => {
			if (isSuccess) {
				this.feedback.successToast();
				this.update.run();
			}
		});
	}
}
