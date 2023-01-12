import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Income } from 'src/app/entities/income/income.model';

@Component({
  selector: 'income-desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.scss']
})
export class IncomeDesktopViewComponent implements AfterViewInit {
	@Input() public periodIncome?: MatTableDataSource<Income>;
	@Input() public displayedColumns?: string[];
	@Input() public totalAmount?: number;

	@Output() public editIncome = new EventEmitter<Income>();
	@Output() public deleteIncome = new EventEmitter<Income>();

	@ViewChild(MatSort) public sort?: MatSort;

	public expandedElement?: Income | null;

	public ngAfterViewInit() {
		if (this.sort && this.periodIncome) {
			this.periodIncome.sort = this.sort;
			return;
		}

		console.error('MatSort property not initialized.')
	}
}
