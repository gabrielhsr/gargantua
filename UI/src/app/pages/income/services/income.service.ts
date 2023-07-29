import { Guid } from 'src/app/domain/base.model';
import { Income } from 'src/app/domain/income/income.model';
import { IncomeDialogComponent } from '../components/income-dialog/income-dialog.component';
import { IncomeEndpoint } from 'src/app/domain/income/income.endpoint';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Period } from 'src/app/domain/period/period.model';
import { UpdateService } from 'src/app/shared/services/update.service';
import { tap } from 'rxjs';

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

		return this.update.handle(this.incomeEndpoint.getIncomeByPeriod(period.month, period.year));
	}

	public saveIncome(income: Income) {
		const operation = Guid.isNullOrDefault(income.id) ? this.incomeEndpoint.post(income) : this.incomeEndpoint.put(income, income.id);

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

