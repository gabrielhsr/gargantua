import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ExpenseEndpoint } from 'src/app/domain/expense/expense.endpoint';

@Component({
    selector: 'expenses-table',
    templateUrl: './expenses-table.component.html',
    styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    private readonly expenseEndpoint = inject(ExpenseEndpoint);

    protected queryCommand = this.expenseEndpoint.getODataCommand();

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
