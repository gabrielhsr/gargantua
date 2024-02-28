import { Component } from '@angular/core';
import { Expense } from 'src/app/domain/expense/expense.model';
import { ExpenseService } from './services/expense.service';

@Component({
	selector: 'g-page-expenses',
	templateUrl: './expenses.page.html',
	styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage {
	constructor(private readonly expenseService: ExpenseService) {}

	public openAddDialog() {
		const newExpense = new Expense();

		this.expenseService.openFormDialog(newExpense);
	}
}
