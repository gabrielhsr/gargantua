import { Component } from '@angular/core';
import { IncomeService } from './services/income.service';

@Component({
	selector: 'page-income',
	templateUrl: './income.page.html',
	styleUrls: ['./income.page.scss'],
})
export class IncomePage {
	constructor(private readonly incomeService: IncomeService) {}

	public openAddDialog() {
		this.incomeService.openInsertDialog();
	}
}
