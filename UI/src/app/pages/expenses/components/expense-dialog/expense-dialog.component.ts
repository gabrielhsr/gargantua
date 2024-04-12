import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CategoryEndpoint } from 'src/app/domain/category/category.endpoint';
import { Category } from 'src/app/domain/category/category.model';
import { ExpenseEndpoint } from 'src/app/domain/expense/expense.endpoint';
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
    public submitCommand = this.expenseEndpoint.saveCommand(this.bodyBuilder.bind(this));

    public categoryCommand = this.categoryEndpoint.getODataCommand();
    public paymentMethodCommand = this.paymentMethodEndpoint.getODataCommand();

    public filteredCategories?: Observable<Category[] | undefined>;
    public filteredPaymentMethods?: Observable<PaymentMethod[] | undefined>;

    public showRecurrentCheck = false;

    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly dialogRef: MatDialogRef<ExpenseDialogComponent>,
        private readonly categoryEndpoint: CategoryEndpoint,
        private readonly paymentMethodEndpoint: PaymentMethodEndpoint,
        private readonly expenseEndpoint: ExpenseEndpoint,
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

        this.submitCommand.response$
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.feedbackService.toastResponse(res);

                if (res.isSuccess) {
                    this.dialogRef.close();
                }
            });
    }

    public ngOnDestroy(): void {
        this.categoryCommand.destroy();
        this.paymentMethodCommand.destroy();

        this.destroy$.next();
        this.destroy$.complete();
    }

    public submitForm(): void {
        this.submitCommand.execute();
    }

    public displayFn(category: Category | PaymentMethod): string {
        return category?.Name ?? '';
    }

    public clearInput(controlName: string[]): void {
        controlName.forEach(((name) => this.expenseForm.controls[name].patchValue(null)));
    }

    private createForm(): void {
        this.expenseForm.addControl('description', new FormControl('teste', [Validators.required]));
        this.expenseForm.addControl('amount', new FormControl(1234, [Validators.required]));
        this.expenseForm.addControl('category', new FormControl('teste', [Validators.required]));
        this.expenseForm.addControl('paymentMethod', new FormControl('teste', [Validators.required]));
        this.expenseForm.addControl('dueDate', new FormControl(null));
        this.expenseForm.addControl('purchaseDate', new FormControl(new Date(), [Validators.required]));
    }

    private bodyBuilder() {
        const formValue = this.expenseForm.getRawValue();

        if (typeof formValue.category === 'string') {
            formValue.category = new Category(formValue.category);
        }

        if (typeof formValue.paymentMethod === 'string') {
            formValue.paymentMethod = new PaymentMethod(formValue.paymentMethod);
        }

        return formValue;
    }
}
