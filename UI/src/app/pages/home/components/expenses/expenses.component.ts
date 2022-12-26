import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize, pipe } from 'rxjs';
import { Expense } from 'src/app/entities/expense/expense.model';
import { ExpenseService } from 'src/app/shared/services/expense.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

@Component({
	selector: 'app-expenses-table',
	templateUrl: './expenses.component.html',
	styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
	public displayedColumns: string[] = Object.keys(new Expense()).filter((x) => x !== 'id');
	public expenses?: Expense[];

	public expensesLoading: boolean = true;

	constructor(private readonly expenseService: ExpenseService) {}

	ngOnInit(): void {
		this.expenseService.getAllExpenses().subscribe((response) => {
			if (response.isSuccess) {
				this.expenses = response.value;
			}

			this.expensesLoading = false;
		});
	}
}
