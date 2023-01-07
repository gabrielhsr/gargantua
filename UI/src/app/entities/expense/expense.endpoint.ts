import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { Period } from '../period/period.dto';
import { Expense } from './expense.model';

@Injectable({
	providedIn: 'root',
})
export class ExpenseEndpoint extends BaseEndpoint<Expense> {
	public override url = '/api/Expenses/';

	constructor(private readonly service: HttpService) {
		super(service);
	}

	public getExpensesPeriods() {
		return this.service.get<Period[]>(this.url + 'periods');
	}

	public getExpensesByPeriod(month: number, year: number) {
		return this.service.get<Expense[]>(this.url + 'expensesByPeriod', { month, year });
	}
}
