import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { Expense } from 'src/app/domain/expense/expense.model';
import { EmptyPipe } from 'src/app/shared/pipes/empty.pipe';
import { OdataQueryCommand } from 'src/app/shared/utils/command/odata/odata-query-command';

@Component({
    selector: 'expenses-mobile-view',
    templateUrl: './mobile-view.component.html',
    styleUrls: ['./mobile-view.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        MatCardModule,
        MatDividerModule,
        EmptyPipe
    ]
})
export class ExpensesMobileViewComponent {
    @Input({ required: true }) public expensesCommand?: OdataQueryCommand<Expense>;

    @Output() public editExpense = new EventEmitter<Expense>();
    @Output() public deleteExpense = new EventEmitter<Expense>();

    public openedPanels: string[] = [];

    public get expenses() {
        return this.expensesCommand?.response.data?.value;
    }

    public forgotPanel(id: string) {
        return (this.openedPanels = this.openedPanels.filter((x) => x !== id));
    }
}
