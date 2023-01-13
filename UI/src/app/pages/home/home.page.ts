import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { Component, OnInit } from '@angular/core';
import { combineLatest, of, Subject, switchMap } from 'rxjs';
import { Period } from 'src/app/entities/period/period.dto';
import { TranslateService } from 'src/app/shared/translate/translate.service';
import { ExpenseService } from '../expenses/services/expense.service';
import { IncomeService } from '../income/services/income.service';
@Component({
	selector: 'page-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	public periodSubject = new Subject<Period | undefined>();

	public totalIncome: number = 0;
	public totalExpenses: number = 0;
	public loading: boolean = true;

	public fabButtons: MatFabMenu[] = [
		{
			id: 'income',
			icon: 'attach_money',
			tooltip: this.translate.instant('Pages.Income.NewIncome'),
			tooltipPosition: 'left'
		},
		{
			id: 'expense',
			icon: 'money_off',
			tooltip: this.translate.instant('Pages.Expenses.NewExpense'),
			tooltipPosition: 'left'
		},
	];

	constructor(
		private readonly incomeService: IncomeService,
		private readonly expensesService: ExpenseService,
		private readonly translate: TranslateService
	) {}

	public ngOnInit(): void {
		this.periodSubject
			.pipe(switchMap((period) => {
				if (period) {
					const income = this.incomeService.getIncomeByPeriod(period);
					const expenses = this.expensesService.getExpensesByPeriod(period);

					return combineLatest({ income, expenses });
				}

				return of(period);
			}))
			.subscribe((res) => {
				this.loading = true;

				const expenses = res?.expenses;
				const income = res?.income;

				if (expenses?.isSuccess && income?.isSuccess) {
					this.totalExpenses = expenses.value.map((x) => x.amount ?? 0).reduce((acc, val) => acc + val, 0);
					this.totalIncome = income.value.map((x) => x.amount ?? 0).reduce((acc, val) => acc + val, 0);
				}

				this.loading = false;
			});
	}

	public menuItemSelected(item: string | number) {
		switch (item) {
			case 'income':
				this.incomeService.openFormDialog();
				break;
			case 'expense':
				this.expensesService.openFormDialog();
				break;
			default:
				console.error(`Unknown 'id' for mat-fab-menu. ID: ${item}`);
				break;
		}
	}
}
