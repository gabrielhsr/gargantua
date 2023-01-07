import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, of, Subject, switchMap } from 'rxjs';
import { Expense } from 'src/app/entities/expense/expense.model';
import { Period } from 'src/app/entities/period/period.dto';
import { sortingExpenseDataAccessor } from 'src/app/shared/helpers/sort.helper';
import { toTitleCase } from 'src/app/shared/helpers/string.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ExpenseService } from '../../services/expense.service';

export interface SortOption {
	text: string;
	value: keyof Expense;
	order?: 'asc' | 'desc';
}

@Component({
	selector: 'expenses-table',
	templateUrl: './expenses-table.component.html',
	styleUrls: ['./expenses-table.component.scss'],
})
export class ExpensesTableComponent implements OnInit {
	public expensesLoading: boolean = true;

	public periodExpenses = new MatTableDataSource<Expense>();
	public displayedColumns: string[] = [...Object.keys(new Expense()), 'options'].filter((x) => x !== 'id');

	public periodSubject = new Subject<Period | undefined>();

	private lastSortOption?: SortOption;

	constructor(
		private readonly expenseService: ExpenseService,
		private readonly feedback: FeedbackService
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
			.pipe(switchMap((period) => period ? this.expenseService.getExpensesByPeriod(period) : of(period)))
			.subscribe((res) => {
				if (res?.isSuccess) {
					this.periodExpenses.data = res.value;
					this.sort();
				}

				this.expensesLoading = false;
			});
	}

	public deleteExpense(expense: Expense) {
		this.feedback
			.confirmCancelDialog(expense.description)
			.pipe(switchMap((res) => res?.delete ? this.expenseService.removeExpense(expense.id) : EMPTY))
			.subscribe((res) => res.isSuccess ? this.feedback.successToast('Feedback.DeleteSuccess') : null);
	}

	public editExpense(expense: Expense) {
		this.expenseService.openInsertDialog(expense);
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
}
