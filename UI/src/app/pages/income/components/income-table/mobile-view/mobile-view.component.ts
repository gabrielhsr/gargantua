// import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { Income } from 'src/app/domain/income/income.model';

// @Component({
//     selector: 'income-mobile-view',
//     templateUrl: './mobile-view.component.html',
//     styleUrls: ['./mobile-view.component.scss']
// })
// export class IncomeMobileViewComponent {
//     @Input() public periodIncome?: MatTableDataSource<Income>;
//     @Input() public totalAmount?: number;

//     @ViewChild(MatSort) public sort?: MatSort;

//     @Output() public editIncome = new EventEmitter<Income>();
//     @Output() public deleteIncome = new EventEmitter<Income>();

//     public openedPanels: string[] = [];

//     public forgetPanel(id: string): string[] {
//         return this.openedPanels = this.openedPanels.filter((x) => x !== id);
//     }
// }
