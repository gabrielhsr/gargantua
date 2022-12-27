import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize, pipe } from 'rxjs';
import { Expense } from 'src/app/entities/expense/expense.model';
import { ExpenseService } from 'src/app/shared/services/expense.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { TranslateService } from 'src/app/shared/translate/translate.service';

@Component({
	selector: 'app-expenses-table',
	templateUrl: './expenses.component.html',
	styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
	public displayedColumns: string[] = [...Object.keys(new Expense()), 'options'].filter((x) => x !== 'id');
	public expenses?: Expense[];

	public expensesLoading: boolean = true;

	constructor(
		private readonly expenseService: ExpenseService,
		private readonly feedback: FeedbackService,
		private readonly translate: TranslateService
	) {}

	public ngOnInit(): void {
		this.expenseService.getAllExpenses().subscribe((response) => {
			if (response.isSuccess) {
				this.expenses = response.value;
			}

			this.expensesLoading = false;
		});
	}

	public deleteExpense(id: string): void {
		console.log(id);

		this.expenseService.removeExpense(id).subscribe(res => {
			if (res.isSuccess) {
				this.feedback.successToast("Feedback.DeleteSuccess");
			}
		});
	}
}
