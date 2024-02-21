import { Component } from '@angular/core';
import { Expense } from 'src/app/domain/expense/expense.model';
import { RequestCommand } from 'src/app/shared/utils/request-command';
import { ExpenseService } from './services/expense.service';

@Component({
	selector: 'page-expenses',
	templateUrl: './expenses.page.html',
	styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage {
	constructor(private readonly expenseService: ExpenseService) {
		const command = new RequestCommand(this.expenseService.getCategories());

		command.execute();
	}

	public openAddDialog() {
		const newExpense = new Expense();

		this.expenseService.openFormDialog(newExpense);
	}
}
