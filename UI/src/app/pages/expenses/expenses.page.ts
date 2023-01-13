import { Component } from '@angular/core';
import { ExpenseService } from './services/expense.service';

@Component({
	selector: 'page-expenses',
	templateUrl: './expenses.page.html',
	styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage {
	constructor(private readonly expenseService: ExpenseService) {}

	public openAddDialog() {
		this.expenseService.openFormDialog();
	}
}
