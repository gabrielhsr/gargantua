import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeriodSelectComponent } from 'src/app/shared/components/period-select/period-select.component';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { ExpenseService } from './services/expense.service';

@Component({
    selector: 'g-page-expenses',
    templateUrl: './expenses.page.html',
    styleUrls: ['./expenses.page.scss'],
    standalone: true,
    imports: [
        PeriodSelectComponent,
        ExpensesTableComponent,
        MatIconModule,
        MatButtonModule
    ]
})
export class ExpensesPage {
    protected readonly expenseService = inject(ExpenseService);
}
