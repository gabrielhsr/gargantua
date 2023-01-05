import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Subject, switchMap } from 'rxjs';
import { Expense } from 'src/app/entities/expense/expense.model';
import { Period } from 'src/app/entities/period/period.dto';
import { sortingDataAccessor } from 'src/app/shared/helpers/expense.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ExpenseService } from '../../services/expense.service';
import { SortOption } from './period-select/period-select.component';

@Component({
	selector: 'expenses-table',
	templateUrl: './expenses-table.component.html',
	styleUrls: ['./expenses-table.component.scss'],
})
export class ExpensesTableComponent implements OnInit {
	public expensesLoading: boolean = true;

	public periodExpenses = new MatTableDataSource<Expense>();
	public displayedColumns: string[] = [...Object.keys(new Expense()), 'options'].filter((x) => x !== 'id');

	public periodSubject = new Subject<Period>();

	constructor(
		private readonly expenseService: ExpenseService,
		private readonly feedback: FeedbackService
	) {}

	public get totalAmount() {
		return this.periodExpenses.data.map(x => x.amount ?? 0).reduce((acc, val) => acc + val, 0)
	};

	public ngOnInit() {
		this.periodSubject
			.pipe(switchMap((period) => this.expenseService.getExpensesByPeriod(period)))
			.subscribe((res) => {
				if (res.isSuccess) {
					this.periodExpenses.data = res.value;
					this.expenseService.sortOption.next(this.expenseService.sortOption.value);
				}

				this.expensesLoading = false;
			});

		this.expenseService.sortOption.subscribe(option => option ? this.sort(option) : EMPTY);
	}

	public deleteExpense(expense: Expense) {
		this.feedback
			.confirmCancelDialog(expense.description)
			.pipe(switchMap((res) => res?.delete ? this.expenseService.removeExpense(expense.id) : EMPTY))
			.subscribe((res) => res.isSuccess ? this.feedback.successToast('Feedback.DeleteSuccess') : null);
	}

	public editExpense(expense: Expense) {
		this.expenseService.openExpenseDialog(expense);
	}

	public sort(category: SortOption) {
		this.periodExpenses.data = this.periodExpenses.data.sort((expenseA, expenseB) => {
			const itemA = sortingDataAccessor(expenseA, category.value);
			const itemB = sortingDataAccessor(expenseB, category.value);

			if (itemA && itemB) {
				return category.order === 'asc' ? (itemA < itemB ? -1 : itemA > itemB ? 1 : 0) : (itemA > itemB ? -1 : itemA < itemB ? 1 : 0);
			}

			throw new Error(`Key named '${category.value}' not finded in object of type 'Expense'!`);
		});
	}
}
