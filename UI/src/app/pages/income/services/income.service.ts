import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

import { IncomeEndpoint } from 'src/app/entities/income/income.endpoint';

import { Period } from 'src/app/entities/period/period.dto';

import { GuidHelper } from '../../../shared/helpers/guid.helper';

import { IncomeDialogComponent } from '../components/income-dialog/income-dialog.component';
import { Income } from 'src/app/entities/income/income.model';
import { UpdateService } from 'src/app/shared/services/update.service';

@Injectable({
	providedIn: 'root',
})
export class IncomeService {
	public selectedPeriod?: Period;

	constructor(
		private readonly incomeEndpoint: IncomeEndpoint,
		private readonly dialog: MatDialog,
		private readonly update: UpdateService
	) {	}

	public getAllIncomes() {
		return this.update.handle(this.incomeEndpoint.get());
	}

	public getIncomeByPeriod(period: Period) {
		this.selectedPeriod = period;

		return this.update.handle(this.incomeEndpoint.getIncomeByPeriod(period.month, period.year))
	}

	public saveIncome(income: Income) {
		const operation = GuidHelper.isNullOrDefault(income.id) ? this.incomeEndpoint.post(income) : this.incomeEndpoint.put(income, income.id);

		return operation.pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.update.run();
			})
		);
	}

	public removeIncome(id: string) {
		return this.incomeEndpoint.delete(id).pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.update.run();
			})
		);
	}

	public openFormDialog(income?: Income, editMonth?: boolean) {
		this.dialog.open(IncomeDialogComponent, { data: { income, editMonth }, panelClass: ['responsive-dialog'] });
	}
}

