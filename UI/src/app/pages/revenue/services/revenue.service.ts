import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

import { RevenueEndpoint } from 'src/app/entities/revenue/revenue.endpoint';

import { Period } from 'src/app/entities/period/period.dto';

import { GuidHelper } from '../../../shared/helpers/guid.helper';

import { PeriodService } from 'src/app/shared/components/period-select/period-select.service';

import { RevenueDialogComponent } from '../components/revenue-dialog/revenue-dialog.component';
import { Revenue } from 'src/app/entities/revenue/revenue.model';

@Injectable({
	providedIn: 'root',
})
export class RevenueService {
	private revenueUpdate = new BehaviorSubject<void>(undefined);

	constructor(
		private readonly revenueEndpoint: RevenueEndpoint,
		private readonly periodService: PeriodService,
		private readonly dialog: MatDialog
	) {	}

	public getAllRevenues() {
		return this.revenueUpdate.pipe(switchMap(() => this.revenueEndpoint.get()));
	}

	public getRevenueByPeriod(period: Period) {
		return this.revenueUpdate.pipe(switchMap(() => this.revenueEndpoint.getRevenueByPeriod(period.month, period.year)));
	}

	public saveRevenue(revenue: Revenue) {
		const operation = GuidHelper.isNullOrDefault(revenue.id) ? this.revenueEndpoint.post(revenue) : this.revenueEndpoint.put(revenue, revenue.id);

		return operation.pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) {
					this.revenueUpdate.next()
					this.periodService.update.next();
				};
			})
		);
	}

	public removeRevenue(id: string) {
		return this.revenueEndpoint.delete(id).pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) {
					this.revenueUpdate.next()
					this.periodService.update.next();
				};
			})
		);
	}

	public openRevenueDialog(revenue?: Revenue) {
		this.dialog.open(RevenueDialogComponent, { data: revenue, panelClass: ['responsive-dialog'] });
	}
}

