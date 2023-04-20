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

	public get showCheckBox(): boolean {
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
		if (check) {
			this.paidExpenses.push(expense);
		} else {
			this.paidExpenses = this.paidExpenses.filter(paidExpense => paidExpense.id !== expense.id);
		}
	}

	public save() {
		const ids = this.paidExpenses.map(expense => expense.id);

		this.expenseEndpoint.markAsPaid(ids).subscribe(res => {
			if (res.isSuccess) {
				this.feedback.successToast();
				this.update.run();
			}
		});
	}
}
