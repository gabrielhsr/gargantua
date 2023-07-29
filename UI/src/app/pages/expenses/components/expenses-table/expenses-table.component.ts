import { Component, OnDestroy, OnInit } from '@angular/core';

import { Expense } from 'src/app/domain/expense/expense.model';
import { ExpensePaidService } from '../../services/expense-paid.service';
import { ExpenseService } from '../../services/expense.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { Subject } from 'rxjs';

const IGNORE_COLUMNS = [
	'id',
	'installments',
	'periodic',
	'paid',
	'displayDescription',
	'recurrentId',
	'monthInterval',
	'purchaseDate',
	'dueDate',
];

export interface SortOption {
	text: string;
	value: keyof Expense;
	order?: 'asc' | 'desc';
}

@Component({
	selector: 'expenses-table',
	templateUrl: './expenses-table.component.html',
	styleUrls: ['./expenses-table.component.scss'],
	providers: [ExpensePaidService]
})
export class ExpensesTableComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();

	constructor(
		private readonly expenseService: ExpenseService,
		private readonly feedback: FeedbackService,
		private readonly expensePaidService: ExpensePaidService
	) {}

	public ngOnInit() {

	}

	public ngOnDestroy(): void {
		this.destroy$.next();
        this.destroy$.complete();
	}
}
