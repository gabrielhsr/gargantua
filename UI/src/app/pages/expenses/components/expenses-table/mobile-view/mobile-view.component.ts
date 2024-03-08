// // import {
// //     Component,
// //     EventEmitter,
// //     Input,
// //     Output,
// //     ViewChild,
// // } from '@angular/core';
// // import { MatSort } from '@angular/material/sort';
// // import { MatTableDataSource } from '@angular/material/table';
// // import { Expense } from 'src/app/domain/expense/expense.model';
// // import { ExpensePaidService } from '../../../services/expense-paid.service';

// // @Component({
// //     selector: 'expenses-mobile-view',
// //     templateUrl: './mobile-view.component.html',
// //     styleUrls: ['./mobile-view.component.scss'],
// // })
// // export class MobileViewComponent {
// //     @Input() public periodExpenses?: MatTableDataSource<Expense>;
// //     @Input() public totalAmount?: number;

// //     @ViewChild(MatSort) public sort?: MatSort;

// //     @Output() public editExpense = new EventEmitter<Expense>();
// //     @Output() public deleteExpense = new EventEmitter<Expense>();

// //     constructor(public readonly expensePaidService: ExpensePaidService) {}

// //     public openedPanels: string[] = [];

// //     public forgotPanel(id: string) {
// //         return (this.openedPanels = this.openedPanels.filter((x) => x !== id));
// //     }
// // }
