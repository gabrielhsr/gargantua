import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

import { RevenueEndpoint } from 'src/app/entities/revenue/revenue.endpoint';

import { Period } from 'src/app/entities/period/period.dto';

import { GuidHelper } from '../../../shared/helpers/guid.helper';

import { RevenueDialogComponent } from '../components/revenue-dialog/revenue-dialog.component';
import { SortOption } from '../components/revenue-table/period-select/period-select.component';
import { Revenue } from 'src/app/entities/revenue/revenue.model';


@Injectable({
	providedIn: 'root',
})
export class RevenueService {
	public sortOptions?: SortOption[];
	public sortOption = new BehaviorSubject<SortOption | undefined>(undefined);

	private revenueUpdate = new BehaviorSubject<void>(undefined);

	constructor(
		private readonly revenueEndpoint: RevenueEndpoint,
		private readonly dialog: MatDialog
	) {	}

	public getAllRevenues() {
		return this.revenueUpdate.pipe(switchMap(() => this.revenueEndpoint.get()));
	}

	public getRevenueByPeriod(period: Period) {
		return this.revenueUpdate.pipe(switchMap(() => this.revenueEndpoint.getRevenueByPeriod(period.month, period.year)));
	}

	public getPeriods() {
		return this.revenueUpdate.pipe(switchMap(() => this.revenueEndpoint.getPeriods()));
	}

	public saveRevenue(revenue: Revenue) {
		const operation = GuidHelper.isNullOrDefault(revenue.id) ? this.revenueEndpoint.post(revenue) : this.revenueEndpoint.put(revenue, revenue.id);

		return operation.pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.revenueUpdate.next();
			})
		);
	}

	public removeRevenue(id: string) {
		return this.revenueEndpoint.delete(id).pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.revenueUpdate.next();
			})
		);
	}

	public openRevenueDialog(revenue?: Revenue) {
		this.dialog.open(RevenueDialogComponent, { data: revenue, panelClass: ['responsive-dialog'] });
	}

	public changeSortOption(sortOption: SortOption) {
		if (!this.sortOptions) throw new Error("SortOptions not setted!");

		const indexOption = this.sortOptions.indexOf(sortOption);

		this.sortOptions = this.sortOptions.map((option, index) => {
			return indexOption === index ? { ...option, order: option?.order === 'asc' ? 'desc' : 'asc' } : { ...option, order: undefined };
		})

		this.sortOption.next(this.sortOptions[indexOption]);
	}
}

