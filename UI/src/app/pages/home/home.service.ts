import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethodEndpoint } from 'src/app/entities/paymentMethod/paymentMethod.endpoint';
import { CategoryEndpoint } from 'src/app/entities/category/category.endpoint';
import { ExpenseEndpoint } from 'src/app/entities/expense/expense.endpoint';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { Category } from 'src/app/entities/category/category.model';
import { Expense } from 'src/app/entities/expense/expense.model';

@Injectable({
	providedIn: 'root',
})
export class HomeService {
	constructor(
		private categoryEndpoint: CategoryEndpoint,
		private paymentMethodEndpoint: PaymentMethodEndpoint,
		private expenseEndpoin: ExpenseEndpoint
	) {}

	public getCategories(): Observable<Category[]> {
		return this.categoryEndpoint.get();
	}

	public getPaymentMethods(): Observable<PaymentMethod[]> {
		return this.paymentMethodEndpoint.get();
	}

	public saveExpense(expense: Expense) {
		return this.expenseEndpoin.post(expense);
	}
}

