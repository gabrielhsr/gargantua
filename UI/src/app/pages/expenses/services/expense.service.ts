
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from 'src/app/domain/expense/expense.model';
import { Period } from 'src/app/domain/period/period.model';
import { ExpenseDialogComponent } from '../components/expense-dialog/expense-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    public selectedPeriod?: Period;

    constructor(private readonly dialog: MatDialog) {}

    public openFormDialog(expense?: Expense, editMonth?: boolean) {
        return this.dialog.open(ExpenseDialogComponent, { data: { expense, editMonth }, panelClass: ['responsive-dialog'] });
    }
}

