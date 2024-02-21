import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { Guid } from 'src/app/domain/base.model';
import { IncomeEndpoint } from 'src/app/domain/income/income.endpoint';
import { Income } from 'src/app/domain/income/income.model';
import { Period } from 'src/app/domain/period/period.model';
import { RefreshService } from 'src/app/shared/services/refresh.service';
import { IncomeDialogComponent } from '../components/income-dialog/income-dialog.component';

@Injectable({
	providedIn: 'root',
})
export class IncomeService {
	public selectedPeriod?: Period;

	constructor(
		private readonly incomeEndpoint: IncomeEndpoint,
		private readonly dialog: MatDialog,
		private readonly update: RefreshService
	) {	}

	public getAllIncomes() {
		return this.update.handle(this.incomeEndpoint.get());
	}

	public getIncomeByPeriod(period: Period) {
		this.selectedPeriod = period;

		return this.update.handle(this.incomeEndpoint.getIncomeByPeriod(period.month, period.year));
	}

	public saveIncome(income: Income) {
		const operation = Guid.isNullOrDefault(income.id) ? this.incomeEndpoint.post(income) : this.incomeEndpoint.put(income, income.id);

		return operation.pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.update.execute();
			})
		);
	}

	public removeIncome(id: string) {
		return this.incomeEndpoint.delete(id).pipe(
			tap(({ isSuccess }) => {
				if (isSuccess) this.update.execute();
			})
		);
	}

	public openFormDialog(income?: Income, editMonth?: boolean) {
		this.dialog.open(IncomeDialogComponent, { data: { income, editMonth }, panelClass: ['responsive-dialog'] });
	}
}

