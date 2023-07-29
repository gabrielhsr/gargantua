import { BehaviorSubject, switchMap, tap } from 'rxjs';

import { CategoryEndpoint } from 'src/app/domain/category/category.endpoint';
import { Expense } from 'src/app/domain/expense/expense.model';
import { ExpenseDialogComponent } from '../components/expense-dialog/expense-dialog.component';
import { ExpenseEndpoint } from 'src/app/domain/expense/expense.endpoint';
import { Guid } from 'src/app/domain/base.model';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethodEndpoint } from 'src/app/domain/paymentMethod/paymentMethod.endpoint';
import { Period } from 'src/app/domain/period/period.model';
import { UpdateService } from 'src/app/shared/services/update.service';

@Injectable({
	providedIn: 'root',
})
export class ExpenseService {
	public selectedPeriod?: Period;

	constructor(
		private readonly categoryEndpoint: CategoryEndpoint,
		private readonly paymentMethodEndpoint: PaymentMethodEndpoint,
		private readonly expenseEndpoint: ExpenseEndpoint,
		private readonly update: UpdateService,
		private readonly dialog: MatDialog
	) {	}

	public getCategories() {
		return this.categoryEndpoint.get();
	}

	public getPaymentMethods() {
		return this.paymentMethodEndpoint.get();
	}

	public getAllExpenses() {
		return this.update.handle(this.expenseEndpoint.get());
	}

	public getExpensesByPeriod(period: Period) {
		this.selectedPeriod = period;

		return this.update.handle(this.expenseEndpoint.getExpensesByPeriod(period.month, period.year));
	}

	public saveExpense(expense: Expense) {
		const operation = Guid.isNullOrDefault(expense.id) ? this.expenseEndpoint.post(expense) : this.expenseEndpoint.put(expense, expense.id);

		return operation.pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.update.run() ;
			})
		);
	}

	public removeExpense(id: string) {
		return this.expenseEndpoint.delete(id).pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.update.run();
			})
		);
	}

	public openFormDialog(expense?: Expense, editMonth?: boolean) {
		this.dialog.open(ExpenseDialogComponent, { data: { expense, editMonth }, panelClass: ['responsive-dialog'] });
	}
}

