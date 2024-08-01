import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ExpenseEndpoint } from 'src/app/domain/expense/expense.endpoint';
import { ExpensesMobileViewComponent } from './mobile-view/mobile-view.component';

@Component({
    selector: 'expenses-table',
    templateUrl: './expenses-table.component.html',
    styleUrls: ['./expenses-table.component.scss'],
    standalone: true,
    imports: [
        ExpensesMobileViewComponent
    ]
})
export class ExpensesTableComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    private readonly expenseEndpoint = inject(ExpenseEndpoint);

    protected queryCommand = this.expenseEndpoint.getODataCommand({ expand: 'PaymentMethod, Category' });

    public get expenseList() {
        return this.queryCommand.response.data?.value;
    }

    public ngOnInit() {
        this.queryCommand.execute();
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
