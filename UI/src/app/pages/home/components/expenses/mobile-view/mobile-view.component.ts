import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from 'src/app/entities/expense/expense.model';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent {
	@Input() public periodExpenses?: MatTableDataSource<Expense>;
	@Input() public totalAmount?: number;
	@Input() public loading: boolean = true;

	@Output() public editExpense = new EventEmitter<Expense>();
	@Output() public deleteExpense = new EventEmitter<Expense>();

	public openedPanels: string[] = [];

	public forgetPanel(id: string) {
		return this.openedPanels = this.openedPanels.filter(x => x !== id);
	}
}
