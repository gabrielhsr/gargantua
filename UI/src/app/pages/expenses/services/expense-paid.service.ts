import { Injectable } from '@angular/core';
import { ExpenseEndpoint } from 'src/app/domain/expense/expense.endpoint';
import { Expense, PaidExpense } from 'src/app/domain/expense/expense.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { RefreshService } from 'src/app/shared/services/refresh.service';

@Injectable()
export class ExpensePaidService {
	private checkBoxState: boolean = false;
	private paidExpenses: PaidExpense[] = [];

	constructor(
		private readonly expenseEndpoint: ExpenseEndpoint,
		private readonly feedback: FeedbackService,
		private readonly update: RefreshService
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
		const expensePaid = new PaidExpense();

		expensePaid.id = expense.id;
		expensePaid.paid = check;

		if (item < 0) {
			this.paidExpenses.push(expensePaid);
		} else {
			this.paidExpenses[item] = expensePaid;
		}
	}

	public save() {
		this.expenseEndpoint.markAsPaid(this.paidExpenses).subscribe(({ isSuccess }) => {
			if (isSuccess) {
				this.feedback.successToast();
				this.update.execute();
			}
		});
	}
}
