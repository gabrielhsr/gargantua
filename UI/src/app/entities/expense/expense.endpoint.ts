import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { BaseEndpoint } from '../base.endpoint';
import { Expense } from './expense.model';

@Injectable({
	providedIn: 'root',
})
export class ExpenseEndpoint extends BaseEndpoint<Expense> {
	public override endpoint = '/api/Expenses';

	constructor(private readonly client: HttpClient, private readonly service: HttpService) {
		super(client, service);
	}
}
