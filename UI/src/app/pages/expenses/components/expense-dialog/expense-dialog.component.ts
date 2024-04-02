import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { CategoryEndpoint } from 'src/app/domain/category/category.endpoint';
import { Category } from 'src/app/domain/category/category.model';
import { Expense } from 'src/app/domain/expense/expense.model';
import { PaymentMethodEndpoint } from 'src/app/domain/payment-method/payment-method.endpoint';
import { PaymentMethod } from 'src/app/domain/payment-method/payment-method.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';

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
        private readonly paymentMethodEndpoint: PaymentMethodEndpoint
    ) {}

    public get isLoading(): boolean {
        return this.categoryCommand.isLoading || this.paymentMethodCommand.isLoading;
    }

    public ngOnInit(): void {
        this.createForm();

        this.categoryCommand.execute();
        this.paymentMethodCommand.execute();

        const x = this.categoryCommand.response.value;
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

    public showErrorMessage(input: string): string {
        return FormHelper.showErrorMessage(input, this.expenseForm);
    }

    public displayFn(category: Category | PaymentMethod): string {
        return category?.name ?? '';
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
