import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { CategoryEndpoint } from 'src/app/domain/category/category.endpoint';
import { Category } from 'src/app/domain/category/category.model';
import { Expense } from 'src/app/domain/expense/expense.model';
import { PaymentMethodEndpoint } from 'src/app/domain/payment-method/payment-method.endpoint';
import { PaymentMethod } from 'src/app/domain/payment-method/payment-method.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { FilterBuilder, REPLACEABLE_KEY } from 'src/app/shared/utils/filter-builder';

@Component({
    selector: 'expense-dialog',
    templateUrl: './expense-dialog.component.html',
    styleUrls: ['./expense-dialog.component.scss']

})
export class ExpenseDialogComponent implements OnInit, OnDestroy {
    @Input() public expense?: Expense;

    public expenseForm: FormGroup = new FormGroup({});

    public categoryCommand = this.categoryEndpoint.getODataCommand();
    public paymentMethodCommand = this.paymentMethodEndpoint.getODataCommand();

    public filteredCategories?: Observable<Category[] | undefined>;
    public filteredPaymentMethods?: Observable<PaymentMethod[] | undefined>;

    public showRecurrentCheck = false;

    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly categoryEndpoint: CategoryEndpoint,
        private readonly paymentMethodEndpoint: PaymentMethodEndpoint,
        public readonly feedbackService: FeedbackService
    ) {}

    public get paymentMethodFilter() {
        return new FilterBuilder()
            .contains((op) => op.toLower('Name'), (op) => op.toLower(REPLACEABLE_KEY))
            .build();
    }

    public ngOnInit(): void {
        this.createForm();

        this.categoryCommand.execute();
        this.paymentMethodCommand.execute();

        this.expenseForm.valueChanges.subscribe((x) => console.log('control change', x));
    }

    public ngOnDestroy(): void {
        this.categoryCommand.destroy();
        this.paymentMethodCommand.destroy();

        this.destroy$.next();
        this.destroy$.complete();
    }

    public submitForm(): void {
        console.log(this.expenseForm.value);
    }

    public displayFn(category: Category | PaymentMethod): string {
        return category?.Name ?? '';
    }

    public clearInput(controlName: string[]): void {
        controlName.forEach(((name) => this.expenseForm.controls[name].patchValue(null)));
    }

    private createForm(): void {
        this.expenseForm.addControl('description', new FormControl(null, [Validators.required]));
        this.expenseForm.addControl('amount', new FormControl(null, [Validators.required]));
        this.expenseForm.addControl('category', new FormControl(null, [Validators.required]));
        this.expenseForm.addControl('paymentMethod', new FormControl(null, [Validators.required]));
        this.expenseForm.addControl('dueDate', new FormControl(null, [Validators.required]));
        this.expenseForm.addControl('purchaseDate', new FormControl(null, [Validators.required]));
    }
}
