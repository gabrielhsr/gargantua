import { Component, OnInit } from '@angular/core';
import { Period } from 'src/app/entities/period/period.dto';
import { ExpenseService } from 'src/app/pages/home/services/expense.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	constructor(private readonly expenseService: ExpenseService) {}

	public ngOnInit(): void {}

	public openAddDialog() {
		this.expenseService.openExpenseDialog();
	}
}
