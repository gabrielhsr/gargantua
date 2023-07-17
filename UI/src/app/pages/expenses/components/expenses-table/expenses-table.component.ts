import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, lastValueFrom, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Expense } from 'src/app/domain/expense/expense.model';
import { Period } from 'src/app/domain/period/period.dto';
import { sortingExpenseDataAccessor } from 'src/app/shared/helpers/sort.helper';
import { toTitleCase } from 'src/app/shared/helpers/string.helper';
import { TableHelper } from 'src/app/shared/helpers/table.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ExpenseService } from '../../services/expense.service';
import { ExpensePaidService } from '../../services/expense-paid.service';

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
	public displayedColumns: string[] = TableHelper.GenerateColumns(new Expense(), { remove: IGNORE_COLUMNS, include: ['options'] });
	public periodExpenses = new MatTableDataSource<Expense>();
	public periodSubject = new Subject<Period | undefined>();
	public expensesLoading: boolean = true;
	public originalData: Expense[] = [];

	private lastSortOption?: SortOption;
	private lastFilterOption?: boolean;
	private destroy$ = new Subject<void>();

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
			.filter((column) => column !== 'options')
			.map((column) => {
				const defaultOption: SortOption = { text: `Pages.Expenses.${toTitleCase(column)}`, value: column as keyof Expense };
				return column === 'dueDate' ? { ...defaultOption, order: 'asc' } : defaultOption;
			});
	}

	public ngOnInit() {
		this.periodSubject
			.pipe(
				tap(() => this.expensesLoading = true),
				switchMap((period) => period ? this.expenseService.getExpensesByPeriod(period) : of(period)),
				takeUntil(this.destroy$)
			)
			.subscribe((res) => {
				if (res?.isSuccess) {
					this.originalData = res.value;
					this.filter();
					this.sort();
				}

				this.expensesLoading = false;
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
        this.destroy$.complete();
	}

	public deleteExpense(expense: Expense) {
		this.feedback
			.deleteDialog(expense.description)
			.pipe(
				switchMap((res) => res?.confirm ? this.expenseService.removeExpense(expense.id) : EMPTY),
				takeUntil(this.destroy$)
			)
			.subscribe(({ isSuccess }) => {
				if (isSuccess) this.feedback.successToast('Feedback.DeleteSuccess');
			});
	}

	public async editExpense(expense: Expense) {
		if ((expense.periodic || expense.installments > 1) && !expense.recurrentId) {
			const dialog$ = this.feedback.yesOrNoDialog('Pages.Expenses.EditOption', 'Common.OnlyMonth', 'Common.Periodic');
			const response = await lastValueFrom(dialog$);

			this.expenseService.openFormDialog(expense, response?.confirm);
		} else {
			this.expenseService.openFormDialog(expense);
		}
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

	public filter(showPaid?: boolean) {
		this.lastFilterOption = showPaid ?? this.lastFilterOption;

		this.periodExpenses.data = this.lastFilterOption ? this.originalData : this.originalData.filter(expense => !expense.paid);
	}
}
