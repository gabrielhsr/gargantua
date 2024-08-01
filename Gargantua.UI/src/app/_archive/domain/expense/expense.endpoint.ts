import { Injectable } from '@angular/core';
import { BaseEndpoint } from '../base.endpoint';
import { Expense } from './expense.model';

@Injectable({
    providedIn: 'root'
})
export class ExpenseEndpoint extends BaseEndpoint<Expense> {
    public override activator: Expense = new Expense();
}
