import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, of, Subject, switchMap } from 'rxjs';
import { Period } from 'src/app/entities/period/period.dto';
import { Income } from 'src/app/entities/income/income.model';
import { sortingIncomeDataAccessor } from 'src/app/shared/helpers/sort.helper';
import { toTitleCase } from 'src/app/shared/helpers/string.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { IncomeService } from '../../services/income.service';

export interface SortOption {
	text: string;
	value: keyof Income;
	order?: 'asc' | 'desc';
}

@Component({
	selector: 'income-table',
	templateUrl: './income-table.component.html',
	styleUrls: ['./income-table.component.scss'],
})
export class IncomeTableComponent implements OnInit {
	public incomeLoading: boolean = true;

	public periodIncome = new MatTableDataSource<Income>();
	public displayedColumns: string[] = [...Object.keys(new Income()), 'options']
											.filter((x) => x !== 'id')
											.filter((x) => x !== 'periodic');

	public periodSubject = new Subject<Period | undefined>();

	private lastSortOption?: SortOption;

	constructor(
		private readonly incomeService: IncomeService,
		private readonly feedback: FeedbackService
	) {}

	public get totalAmount() {
		return this.periodIncome.data.map(x => x.amount ?? 0).reduce((acc, val) => acc + val, 0)
	};

	public get sortOptions(): SortOption[] {
		return this.displayedColumns
			.filter((x) => x !== 'options')
			.map((x) => {
				const defaultOption: SortOption = { text: `Pages.Income.${toTitleCase(x)}`, value: x as keyof Income };
				return x === 'paymentDate' ? { ...defaultOption, order: 'asc' } : defaultOption;
			});
	}

	public ngOnInit() {
		this.periodSubject
			.pipe(switchMap((period) => period ? this.incomeService.getIncomeByPeriod(period) : of(period)))
			.subscribe((res) => {
				if (res?.isSuccess) {
					this.periodIncome.data = res.value;
					this.sort();
				}

				this.incomeLoading = false;
			});
	}

	public deleteIncome(income: Income) {
		this.feedback
			.confirmCancelDialog(income.description)
			.pipe(switchMap((res) => res?.delete ? this.incomeService.removeIncome(income.id) : EMPTY))
			.subscribe((res) => res.isSuccess ? this.feedback.successToast('Feedback.DeleteSuccess') : null);
	}

	public editIncome(income: Income) {
		this.incomeService.openInsertDialog(income);
	}

	public sort(category?: SortOption) {
		const sortOption = category ?? this.lastSortOption;

		if (!sortOption) return;

		this.lastSortOption = sortOption;
		this.periodIncome.data = this.periodIncome.data.sort((incomeA, incomeB) => {
			const itemA = sortingIncomeDataAccessor(incomeA, sortOption.value);
			const itemB = sortingIncomeDataAccessor(incomeB, sortOption.value);

			if (itemA && itemB) {
				return sortOption.order === 'asc' ? (itemA < itemB ? -1 : itemA > itemB ? 1 : 0) : (itemA > itemB ? -1 : itemA < itemB ? 1 : 0);
			}

			throw new Error(`Key named '${sortOption.value}' not finded in object of type 'Income'!`);
		});
	}
}
