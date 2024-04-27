import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Guid } from 'src/app/domain/base.model';
import { CategoryEndpoint } from 'src/app/domain/category/category.endpoint';
import { Category } from 'src/app/domain/category/category.model';
import { ExpenseEndpoint } from 'src/app/domain/expense/expense.endpoint';
import { Expense } from 'src/app/domain/expense/expense.model';
import { PaymentMethodEndpoint } from 'src/app/domain/payment-method/payment-method.endpoint';
import { PaymentMethod } from 'src/app/domain/payment-method/payment-method.model';
import { SearchableAutocompleteComponent } from 'src/app/shared/components/searchable-autocomplete/searchable-autocomplete.component';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { FilterBuilder, REPLACEABLE_KEY } from 'src/app/shared/utils/command/filter-builder';

@Component({
    selector: 'expense-dialog',
    templateUrl: './expense-dialog.component.html',
    styleUrls: ['./expense-dialog.component.scss'],
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [
        CommonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        TranslateModule,
        SearchableAutocompleteComponent,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        CurrencyMaskModule
    ]
})
export class ExpenseDialogComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    private readonly dialogRef = inject(MatDialogRef<ExpenseDialogComponent>);
    private readonly categoryEndpoint = inject(CategoryEndpoint);
    private readonly paymentMethodEndpoint = inject(PaymentMethodEndpoint);
    private readonly expenseEndpoint = inject(ExpenseEndpoint);

    protected readonly feedbackService = inject(FeedbackService);
    
    protected submitCommand = this.expenseEndpoint.saveCommand(this.bodyBuilder.bind(this));

    protected categoryCommand = this.categoryEndpoint.getODataCommand();
    protected paymentMethodCommand = this.paymentMethodEndpoint.getODataCommand();

    protected filteredCategories?: Observable<Category[] | undefined>;
    protected filteredPaymentMethods?: Observable<PaymentMethod[] | undefined>;

    protected expenseForm = new FormGroup({
        Description: new FormControl<string | null>(null, [Validators.required]),
        Amount: new FormControl<number | null>(null, [Validators.required]),
        Category: new FormControl<Category | string>('', [Validators.required]),
        PaymentMethod: new FormControl<PaymentMethod | string>('', [Validators.required]),
        PurchaseDate: new FormControl(new Date(), [Validators.required]),
        DueDate: new FormControl<Date | null>(null)
    });

    @Input({ required: true }) public expenseId: string = Guid.default;

    protected get paymentMethodFilter() {
        return new FilterBuilder()
            .contains((op) => op.toLower('Name'), (op) => op.toLower(REPLACEABLE_KEY))
            .build();
    }

    protected get isNew() {
        return this.expenseId === Guid.default;
    }

    public ngOnInit(): void {
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

    protected submitForm(): void {
        this.submitCommand.execute();
    }

    protected displayFn(category: Category | PaymentMethod): string {
        return category?.Name ?? '';
    }

    protected clearInput(controlName: (keyof typeof this.expenseForm.controls)[]): void {
        controlName.forEach(((name) => this.expenseForm.controls[name].patchValue(null)));
    }

    private bodyBuilder() {
        const formValue = this.expenseForm.getRawValue();

        if (typeof formValue.Category === 'string') {
            formValue.Category = new Category(formValue.Category);
        }

        if (typeof formValue.PaymentMethod === 'string') {
            formValue.PaymentMethod = new PaymentMethod(formValue.PaymentMethod);
        }

        return formValue as Expense;
    }
}
