import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, of, Subject, switchMap } from 'rxjs';
import { Period } from 'src/app/entities/period/period.dto';
import { Revenue } from 'src/app/entities/revenue/revenue.model';
import { sortingRevenueDataAccessor } from 'src/app/shared/helpers/sort.helper';
import { toTitleCase } from 'src/app/shared/helpers/string.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { RevenueService } from '../../services/revenue.service';

export interface SortOption {
	text: string;
	value: keyof Revenue;
	order?: 'asc' | 'desc';
}

@Component({
	selector: 'revenue-table',
	templateUrl: './revenue-table.component.html',
	styleUrls: ['./revenue-table.component.scss'],
})
export class RevenueTableComponent implements OnInit {
	public revenueLoading: boolean = true;

	public periodRevenue = new MatTableDataSource<Revenue>();
	public displayedColumns: string[] = [...Object.keys(new Revenue()), 'options'].filter((x) => x !== 'id');

	public periodSubject = new Subject<Period | undefined>();

	private lastSortOption?: SortOption;

	constructor(
		private readonly revenueService: RevenueService,
		private readonly feedback: FeedbackService
	) {}

	public get totalAmount() {
		return this.periodRevenue.data.map(x => x.amount ?? 0).reduce((acc, val) => acc + val, 0)
	};

	public get sortOptions(): SortOption[] {
		return this.displayedColumns
			.filter((x) => x !== 'options')
			.map((x) => {
				const defaultOption: SortOption = { text: `Pages.Revenue.${toTitleCase(x)}`, value: x as keyof Revenue };
				return x === 'paymentDate' ? { ...defaultOption, order: 'asc' } : defaultOption;
			});
	}

	public ngOnInit() {
		this.periodSubject
			.pipe(switchMap((period) => period ? this.revenueService.getRevenueByPeriod(period) : of(period)))
			.subscribe((res) => {
				if (res?.isSuccess) {
					this.periodRevenue.data = res.value;
					this.sort();
				}

				this.revenueLoading = false;
			});
	}

	public deleteRevenue(revenue: Revenue) {
		this.feedback
			.confirmCancelDialog(revenue.description)
			.pipe(switchMap((res) => res?.delete ? this.revenueService.removeRevenue(revenue.id) : EMPTY))
			.subscribe((res) => res.isSuccess ? this.feedback.successToast('Feedback.DeleteSuccess') : null);
	}

	public editRevenue(revenue: Revenue) {
		this.revenueService.openRevenueDialog(revenue);
	}

	public sort(category?: SortOption) {
		const sortOption = category ?? this.lastSortOption;

		if (!sortOption) return;

		this.lastSortOption = sortOption;
		this.periodRevenue.data = this.periodRevenue.data.sort((revenueA, revenueB) => {
			const itemA = sortingRevenueDataAccessor(revenueA, sortOption.value);
			const itemB = sortingRevenueDataAccessor(revenueB, sortOption.value);

			if (itemA && itemB) {
				return sortOption.order === 'asc' ? (itemA < itemB ? -1 : itemA > itemB ? 1 : 0) : (itemA > itemB ? -1 : itemA < itemB ? 1 : 0);
			}

			throw new Error(`Key named '${sortOption.value}' not finded in object of type 'Revenue'!`);
		});
	}
}
