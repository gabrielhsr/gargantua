// // import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
// // import { MatSort } from '@angular/material/sort';
// // import { MatTableDataSource } from '@angular/material/table';
// // import { Expense } from 'src/app/domain/expense/expense.model';
// // import { sortingExpenseDataAccessor } from 'src/app/shared/helpers/sort.helper';
// // import { ExpensePaidService } from '../../../services/expense-paid.service';

// // @Component({
// //   selector: 'expenses-desktop-view',
// //   templateUrl: './desktop-view.component.html',
// //   styleUrls: ['./desktop-view.component.scss']
// // })
// // export class DesktopViewComponent implements AfterViewInit {
// //     @Input() public periodExpenses?: MatTableDataSource<Expense>;
// //     @Input() public displayedColumns?: string[];
// //     @Input() public totalAmount?: number;

// //     @Output() public editExpense = new EventEmitter<Expense>();
// //     @Output() public deleteExpense = new EventEmitter<Expense>();

// //     @ViewChild(MatSort) public sort?: MatSort;

// //     constructor(public readonly expensePaidService: ExpensePaidService) {}

// //     public ngAfterViewInit() {
// //         if (this.sort && this.periodExpenses) {
// //             this.periodExpenses.sort = this.sort;
// //             this.periodExpenses.sortingDataAccessor = sortingExpenseDataAccessor;
// //             return;
// //         }

// //         console.error('MatSort property not initialized.');
// //     }
// // }
