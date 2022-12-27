import { Injectable } from '@angular/core';
import { PaymentMethodEndpoint } from 'src/app/entities/paymentMethod/paymentMethod.endpoint';
import { CategoryEndpoint } from 'src/app/entities/category/category.endpoint';
import { ExpenseEndpoint } from 'src/app/entities/expense/expense.endpoint';
import { Expense } from 'src/app/entities/expense/expense.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ExpenseService {
	private expensesUpdate = new BehaviorSubject<void>(undefined);

	constructor(
		private categoryEndpoint: CategoryEndpoint,
		private paymentMethodEndpoint: PaymentMethodEndpoint,
		private expenseEndpoint: ExpenseEndpoint
	) {	}

	public getCategories() {
		return this.categoryEndpoint.get();
	}

	public getPaymentMethods() {
		return this.paymentMethodEndpoint.get();
	}

	public getAllExpenses() {
		return this.expensesUpdate.pipe(switchMap(() => this.expenseEndpoint.get()));
	}

	public saveExpense(expense: Expense) {
		return this.expenseEndpoint.post(expense).pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.expensesUpdate.next();
			})
		);
	}

	public removeExpense(id: string) {
		return this.expenseEndpoint.delete(id).pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.expensesUpdate.next();
			})
		);
	}
}

