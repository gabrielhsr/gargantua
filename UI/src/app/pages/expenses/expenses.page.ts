import { Component, inject } from '@angular/core';
import { ExpenseService } from './services/expense.service';

@Component({
    selector: 'g-page-expenses',
    templateUrl: './expenses.page.html',
    styleUrls: ['./expenses.page.scss']
})
export class ExpensesPage {
    protected readonly expenseService = inject(ExpenseService);
}
