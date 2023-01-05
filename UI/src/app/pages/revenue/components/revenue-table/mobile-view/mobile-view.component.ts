import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Revenue } from 'src/app/entities/revenue/revenue.model';

@Component({
  selector: 'revenue-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss']
})
export class RevenueMobileViewComponent {
	@Input() public periodRevenue?: MatTableDataSource<Revenue>;
	@Input() public totalAmount?: number;
	@Input() public loading: boolean = true;

	@ViewChild(MatSort) public sort?: MatSort;

	@Output() public editRevenue = new EventEmitter<Revenue>();
	@Output() public deleteRevenue = new EventEmitter<Revenue>();

	public openedPanels: string[] = [];

	public forgetPanel(id: string) {
		return this.openedPanels = this.openedPanels.filter(x => x !== id);
	}
}
