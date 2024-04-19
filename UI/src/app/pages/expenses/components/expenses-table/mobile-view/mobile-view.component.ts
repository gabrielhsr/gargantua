import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ODataResponse } from 'src/app/domain/base.model';
import { Expense } from 'src/app/domain/expense/expense.model';
import { QueryCommand } from 'src/app/shared/utils/command/query-command';

@Component({
    selector: 'expenses-mobile-view',
    templateUrl: './mobile-view.component.html',
    styleUrls: ['./mobile-view.component.scss'],
})
export class MobileViewComponent {
    @Input({ required: true }) public expensesCommand?: QueryCommand<ODataResponse<Expense>>;

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
