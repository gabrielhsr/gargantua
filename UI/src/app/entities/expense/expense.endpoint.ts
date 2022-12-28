import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { Period } from '../period/period.dto';
import { Expense } from './expense.model';

@Injectable({
	providedIn: 'root',
})
export class ExpenseEndpoint extends BaseEndpoint<Expense> {
	public override endpoint = '/api/Expenses/';

	constructor(private readonly client: HttpClient, private readonly service: HttpService) {
		super(client, service);
	}

	public getPeriods() {
		return this.service.handle(this.httpClient.get<Period[]>(environment.baseApi + this.endpoint + 'periods'));
	}

	public getExpensesByPeriod(month: number, year: number) {
		return this.service.handle(this.httpClient.get<Expense[]>(environment.baseApi + this.endpoint + 'expensesByPeriod', { params: { month, year }}));
	}
}
