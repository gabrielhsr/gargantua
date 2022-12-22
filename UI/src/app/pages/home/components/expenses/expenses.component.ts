import { Component, OnInit } from '@angular/core';
import { ExpenseEndpoint } from 'src/app/entities/expense/expense.endpoint';
import { Expense } from 'src/app/entities/expense/expense.model';

@Component({
	selector: 'app-expenses-table',
	templateUrl: './expenses.component.html',
	styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
	expenses?: Expense[];
	displayedColumns: string[] = Object.keys(new Expense()).filter(x => x !== 'id');

	constructor(private endpoint: ExpenseEndpoint) {
	}

	ngOnInit(): void {
		this.endpoint.get().subscribe(res => {
			console.log(res);

			this.expenses = res;
		})
	}
}
