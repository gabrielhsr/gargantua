import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Expense } from 'src/app/entities/expense/expense.model';
import { Period } from 'src/app/entities/period/period.dto';
import { sortingExpenseDataAccessor } from 'src/app/shared/helpers/sort.helper';
import { toTitleCase } from 'src/app/shared/helpers/string.helper';
import { TableHelper } from 'src/app/shared/helpers/table.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ExpenseService } from '../../services/expense.service';
import { ExpensePaidService } from '../../services/expense-paid.service';

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
	public displayedColumns: string[] = TableHelper.GenerateColumns(new Expense(), { remove: ['id', 'installments', 'periodic', 'paid'], include: ['options'] });
	public periodExpenses = new MatTableDataSource<Expense>();
	public periodSubject = new Subject<Period | undefined>();
	public expensesLoading: boolean = true;

	private lastSortOption?: SortOption;
	private originalData: Expense[] = [];

	private destroy = new Subject();

	constructor(
		private readonly expenseService: ExpenseService,
		private readonly feedback: FeedbackService,
		public readonly expensePaidService: ExpensePaidService
	) {}

	public get totalAmount() {
		return this.periodExpenses.data.map(x => x.amount ?? 0).reduce((acc, val) => acc + val, 0)
	};

	public get sortOptions(): SortOption[] {
		return this.displayedColumns
			.filter((x) => x !== 'options')
			.map((x) => {
				const defaultOption: SortOption = { text: `Pages.Expenses.${toTitleCase(x)}`, value: x as keyof Expense };
				return x === 'purchaseDate' ? { ...defaultOption, order: 'asc' } : defaultOption;
			});
	}

	public ngOnInit() {
		this.periodSubject
			.pipe(
				switchMap((period) => period ? this.expenseService.getExpensesByPeriod(period) : of(period)),
				takeUntil(this.destroy)
			)
			.subscribe((res) => {
				if (res?.isSuccess) {
					this.originalData = res.value;
					this.togglePaid(false);
					this.sort();
				}

				this.expensesLoading = false;
			});
	}

	public ngOnDestroy(): void {
		this.destroy.next(null);
        this.destroy.complete();
	}

	public deleteExpense(expense: Expense) {
		this.feedback
			.confirmCancelDialog(expense.description)
			.pipe(
				switchMap((res) => res?.confirm ? this.expenseService.removeExpense(expense.id) : EMPTY),
				takeUntil(this.destroy)
			)
			.subscribe(({ isSuccess }) => {
				if (isSuccess) this.feedback.successToast('Feedback.DeleteSuccess');
			});
	}

	public editExpense(expense: Expense) {
		this.expenseService.openFormDialog(expense);
	}

	public sort(category?: SortOption) {
		const sortOption = category ?? this.lastSortOption;

		if (!sortOption) return;

		this.lastSortOption = sortOption;
		this.periodExpenses.data = this.periodExpenses.data.sort((expenseA, expenseB) => {
			const itemA = sortingExpenseDataAccessor(expenseA, sortOption.value);
			const itemB = sortingExpenseDataAccessor(expenseB, sortOption.value);

			if (itemA && itemB) {
				return sortOption.order === 'asc' ? (itemA < itemB ? -1 : itemA > itemB ? 1 : 0) : (itemA > itemB ? -1 : itemA < itemB ? 1 : 0);
			}

			throw new Error(`Key named '${sortOption.value}' not finded in object of type 'Expense'!`);
		});
	}

	public togglePaid(showPaid: boolean) {
		this.periodExpenses.data = showPaid ? this.originalData : this.originalData.filter(expense => !expense.paid);
	}
}
