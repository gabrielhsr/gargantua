import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseEndpoint } from '../base.endpoint';
import { ExpenseDto } from './expense.model';

@Injectable({
	providedIn: 'root',
})
export class ExpenseEndpoint extends BaseEndpoint<ExpenseDto> {
	public override endpoint = '/api/Expenses';

	constructor(private readonly http: HttpClient) {
		super(http);
	}
}
