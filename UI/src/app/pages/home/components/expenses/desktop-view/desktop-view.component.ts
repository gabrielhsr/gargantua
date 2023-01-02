import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from 'src/app/entities/expense/expense.model';
import { sortingDataAccessor } from 'src/app/shared/helpers/expense.helper';

@Component({
  selector: 'expenses-desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.scss']
})
export class DesktopViewComponent implements AfterViewInit {
	@Input() public periodExpenses?: MatTableDataSource<Expense>;
	@Input() public displayedColumns?: string[];
	@Input() public totalAmount?: number;
	@Input() public loading: boolean = true;

	@Output() public editExpense = new EventEmitter<Expense>();
	@Output() public deleteExpense = new EventEmitter<Expense>();

	@ViewChild(MatSort) public sort?: MatSort;

	public ngAfterViewInit() {
		if (this.sort && this.periodExpenses) {
			this.periodExpenses.sort = this.sort;
			this.periodExpenses.sortingDataAccessor = sortingDataAccessor;
			return;
		}

		console.error('MatSort property not initialized.')
	}
}
