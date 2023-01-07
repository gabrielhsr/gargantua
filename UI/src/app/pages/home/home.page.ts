import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { Component, OnInit } from '@angular/core';
import { combineLatest, of, Subject, switchMap } from 'rxjs';
import { Period } from 'src/app/entities/period/period.dto';
import { ExpenseService } from '../expenses/services/expense.service';
import { RevenueService } from '../revenue/services/revenue.service';
@Component({
	selector: 'page-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	public periodSubject = new Subject<Period | undefined>();

	public totalRevenue: number = 0;
	public totalExpenses: number = 0;
	public loading: boolean = true;

	public fabButtons: MatFabMenu[] = [
		{
			id: 'revenue',
			icon: 'attach_money',
		},
		{
			id: 'expense',
			icon: 'money_off',
		},
	];

	constructor(
		private readonly revenueService: RevenueService,
		private readonly expensesService: ExpenseService
	) {}

	public ngOnInit(): void {
		this.periodSubject
			.pipe(switchMap((period) => {
				if (period) {
					const revenue = this.revenueService.getRevenueByPeriod(period);
					const expenses = this.expensesService.getExpensesByPeriod(period);

					return combineLatest({ revenue, expenses });
				}

				return of(period);
			}))
			.subscribe((res) => {
				this.loading = true;

				const expenses = res?.expenses;
				const revenue = res?.revenue;

				if (expenses?.isSuccess && revenue?.isSuccess) {
					this.totalExpenses = expenses.value.map((x) => x.amount ?? 0).reduce((acc, val) => acc + val, 0);
					this.totalRevenue = revenue.value.map((x) => x.amount ?? 0).reduce((acc, val) => acc + val, 0);

					this.loading = false;
				}
			});
	}

	public menuItemSelected(item: string | number) {
		switch (item) {
			case 'revenue':
				this.revenueService.openInsertDialog();
				break;
			case 'expense':
				this.expensesService.openInsertDialog();
				break;
			default:
				console.error(`Unknown 'id' for mat-fab-menu. ID: ${item}`);
				break;
		}
	}
}
