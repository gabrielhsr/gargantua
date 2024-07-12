
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Guid } from 'src/app/domain/base.model';
import { Period } from 'src/app/domain/period/period.model';
import { ExpenseDialogComponent } from '../components/expense-dialog/expense-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private readonly dialog = inject(MatDialog);

    public selectedPeriod?: Period;

    public openFormDialog(expenseId: string = Guid.default) {
        const dialog = this.dialog.open(ExpenseDialogComponent, { panelClass: ['responsive-dialog'] });

        dialog.componentInstance.expenseId = expenseId;

        return dialog;
    }
}

