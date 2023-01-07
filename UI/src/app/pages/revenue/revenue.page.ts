import { Component } from '@angular/core';
import { RevenueService } from './services/revenue.service';

@Component({
	selector: 'page-revenue',
	templateUrl: './revenue.page.html',
	styleUrls: ['./revenue.page.scss'],
})
export class RevenuePage {
	constructor(private readonly revenueService: RevenueService) {}

	public openAddDialog() {
		this.revenueService.openInsertDialog();
	}
}
