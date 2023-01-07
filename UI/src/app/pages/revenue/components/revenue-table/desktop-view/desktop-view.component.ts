import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Revenue } from 'src/app/entities/revenue/revenue.model';

@Component({
  selector: 'revenue-desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.scss']
})
export class RevenueDesktopViewComponent implements AfterViewInit {
	@Input() public periodRevenue?: MatTableDataSource<Revenue>;
	@Input() public displayedColumns?: string[];
	@Input() public totalAmount?: number;

	@Output() public editRevenue = new EventEmitter<Revenue>();
	@Output() public deleteRevenue = new EventEmitter<Revenue>();

	@ViewChild(MatSort) public sort?: MatSort;

	public expandedElement?: Revenue | null;

	public ngAfterViewInit() {
		if (this.sort && this.periodRevenue) {
			this.periodRevenue.sort = this.sort;
			return;
		}

		console.error('MatSort property not initialized.')
	}
}
