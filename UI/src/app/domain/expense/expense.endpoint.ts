import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { Expense, PaidExpense } from './expense.model';

@Injectable({
	providedIn: 'root',
})
export class ExpenseEndpoint extends BaseEndpoint<Expense> {
	constructor(private readonly service: HttpService) {
		super(service, '/api/Expense');
	}

	public getExpensesByPeriod(month: number, year: number) {
		return this.service.get<Expense[]>(`${this.url}\\expensesByPeriod`, { month, year });
	}

	public markAsPaid(expenses: PaidExpense[]) {
		return this.service.post<PaidExpense[], void>(`${this.url}\\markAsPaid`, expenses);
	}
}
