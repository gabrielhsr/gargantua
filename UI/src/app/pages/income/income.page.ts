import { Component } from '@angular/core';
import { Income } from 'src/app/entities/income/income.model';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { IncomeService } from './services/income.service';

@Component({
	selector: 'page-income',
	templateUrl: './income.page.html',
	styleUrls: ['./income.page.scss'],
})
export class IncomePage {
	constructor(private readonly incomeService: IncomeService) {}

	public openAddDialog() {
		const newIncome = new Income();
		const selectedPeriod = this.incomeService.selectedPeriod;

		if (selectedPeriod) {
			newIncome.paymentDate = DateHelper.FromPeriod(selectedPeriod);
		}

		this.incomeService.openFormDialog(newIncome);
	}
}
