import { Component } from '@angular/core';
import { Expense } from 'src/app/domain/expense/expense.model';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { ExpenseService } from './services/expense.service';

@Component({
	selector: 'page-expenses',
	templateUrl: './expenses.page.html',
	styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage {
	constructor(private readonly expenseService: ExpenseService) {}

	public openAddDialog() {
		const newExpense = new Expense();
		const selectedPeriod = this.expenseService.selectedPeriod;

		if (selectedPeriod) {
			newExpense.purchaseDate = DateHelper.FromPeriod(selectedPeriod);
		}

		this.expenseService.openFormDialog(newExpense);
	}
}
