import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Period } from 'src/app/entities/period/period.dto';
import { ExpenseService } from 'src/app/shared/services/expense.service';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	public periods?: Period[];
	public selectedPeriod?: Period;

	constructor(
		private readonly dialog: MatDialog,
		private readonly expenseService: ExpenseService
	) {}

	public ngOnInit(): void {
		this.expenseService.getPeriods().subscribe((res) => {
			if (res.isSuccess) {
				this.periods = res.value;

				if (this.periods.length) {
					const currentMonth = new Date().getMonth() + 1;
					const currentYear = new Date().getFullYear();

					const currentPeriod = this.periods.find(({ month, year }) => month === currentMonth && year === currentYear);

					if (currentPeriod) {
						this.selectedPeriod = currentPeriod;
					} else {
						this.selectedPeriod = this.periods.at(-1);
					}
				}
			}
		});
	}

	public openAddDialog() {
		this.dialog.open(AddDialogComponent);
	}
}
