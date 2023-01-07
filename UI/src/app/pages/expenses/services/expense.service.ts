import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

import { PaymentMethodEndpoint } from 'src/app/entities/paymentMethod/paymentMethod.endpoint';
import { CategoryEndpoint } from 'src/app/entities/category/category.endpoint';
import { ExpenseEndpoint } from 'src/app/entities/expense/expense.endpoint';

import { PeriodService } from 'src/app/shared/components/period-select/period-select.service';

import { Expense } from 'src/app/entities/expense/expense.model';
import { Period } from 'src/app/entities/period/period.dto';

import { GuidHelper } from '../../../shared/helpers/guid.helper';

import { ExpenseDialogComponent } from '../components/expense-dialog/expense-dialog.component';
import { UpdateService } from 'src/app/shared/services/update.service';

@Injectable({
	providedIn: 'root',
})
export class ExpenseService {
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
		return this.update.handle(this.expenseEndpoint.getExpensesByPeriod(period.month, period.year));
	}

	public saveExpense(expense: Expense) {
		const operation = GuidHelper.isNullOrDefault(expense.id) ? this.expenseEndpoint.post(expense) : this.expenseEndpoint.put(expense, expense.id);

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

	public openExpenseDialog(expense?: Expense) {
		this.dialog.open(ExpenseDialogComponent, { data: expense, panelClass: ['responsive-dialog'] });
	}
}

