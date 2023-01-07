import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

import { RevenueEndpoint } from 'src/app/entities/revenue/revenue.endpoint';

import { Period } from 'src/app/entities/period/period.dto';

import { GuidHelper } from '../../../shared/helpers/guid.helper';

import { PeriodService } from 'src/app/shared/components/period-select/period-select.service';

import { RevenueDialogComponent } from '../components/revenue-dialog/revenue-dialog.component';
import { Revenue } from 'src/app/entities/revenue/revenue.model';
import { UpdateService } from 'src/app/shared/services/update.service';

@Injectable({
	providedIn: 'root',
})
export class RevenueService {
	constructor(
		private readonly revenueEndpoint: RevenueEndpoint,
		private readonly dialog: MatDialog,
		private readonly update: UpdateService
	) {	}

	public getAllRevenues() {
		return this.update.handle(this.revenueEndpoint.get());
	}

	public getRevenueByPeriod(period: Period) {
		return this.update.handle(this.revenueEndpoint.getRevenueByPeriod(period.month, period.year))
	}

	public saveRevenue(revenue: Revenue) {
		const operation = GuidHelper.isNullOrDefault(revenue.id) ? this.revenueEndpoint.post(revenue) : this.revenueEndpoint.put(revenue, revenue.id);

		return operation.pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.update.run();
			})
		);
	}

	public removeRevenue(id: string) {
		return this.revenueEndpoint.delete(id).pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.update.run();
			})
		);
	}

	public openRevenueDialog(revenue?: Revenue) {
		this.dialog.open(RevenueDialogComponent, { data: revenue, panelClass: ['responsive-dialog'] });
	}
}

