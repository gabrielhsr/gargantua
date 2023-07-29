import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { forkJoin, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/domain/category/category.model';
import { Expense } from 'src/app/domain/expense/expense.model';
import { PaymentMethod } from 'src/app/domain/paymentMethod/paymentMethod.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ExpenseService } from '../../services/expense.service';
import { Guid } from 'src/app/domain/base.model';

@Component({
	selector: 'expense-dialog',
	templateUrl: './expense-dialog.component.html',
	styleUrls: ['./expense-dialog.component.scss'],

})
export class ExpenseDialogComponent implements OnInit, OnDestroy {
	public categories?: Category[];
	public paymentMethods?: PaymentMethod[];

	public expenseForm?: FormGroup;
	public loading: boolean = true;
	public editMonth: boolean = false;
	public showRecurrentCheck: boolean = true;

	public filteredCategories?: Observable<Category[] | undefined>;
	public filteredPaymentMethods?: Observable<PaymentMethod[] | undefined>;

	private destroy$ = new Subject<void>();

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { expense?: Expense, editMonth?: boolean },
		private readonly dialogRef: MatDialogRef<ExpenseDialogComponent>,
		private readonly expenseService: ExpenseService,
		private readonly feedback: FeedbackService
	) {
		forkJoin({
			categories: this.expenseService.getCategories(),
			paymentMethods: this.expenseService.getPaymentMethods(),
		})
			.pipe(takeUntil(this.destroy$))
			.subscribe(({ categories, paymentMethods }) => {
				if (categories.isSuccess && paymentMethods.isSuccess) {
					this.categories = categories.value;
					this.paymentMethods = paymentMethods.value;

					this.loading = false;
				}
			});
	}

	public ngOnInit(): void {
		this.createForm(this.data.expense ?? new Expense());
		this.editMonth = this.data.editMonth ?? false;

		if ((this.editMonth || this.expenseForm?.get('recurrentId')?.value)) {
			this.showRecurrentCheck = false;

			this.expenseForm?.patchValue({ dueDate: this.expenseForm.get('displayDueDate')?.value });
			this.expenseForm?.patchValue({ purchaseDate: this.expenseForm.get('displayPurchaseDate')?.value });
		}

		this.filteredCategories = this.expenseForm?.get('category')?.valueChanges.pipe(startWith(''), map(val => this.filterCategories(val)));
		this.filteredPaymentMethods = this.expenseForm?.get('paymentMethod')?.valueChanges.pipe(startWith(''), map(val => this.filterPaymentMethods(val)));
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
        this.destroy$.complete();
	}

	public submitForm(): void {
		this.loading = true;

		if (this.editMonth) {
			const recurrentId = this.expenseForm?.get('recurrentId')!;
			const periodicInput = this.expenseForm?.get('periodic')!;
			const id = this.expenseForm?.get('id')!;

			periodicInput.patchValue(false);
			recurrentId.patchValue(id.value);
			id.patchValue(Guid.default);
		}

		const formValue = this.expenseForm?.value as Expense;

		if (typeof formValue.category === "string") {
			formValue.category = { name: formValue.category, id: Guid.default }
		}

		if (typeof formValue.paymentMethod === "string") {
			formValue.paymentMethod = { name: formValue.paymentMethod, id: Guid.default }
		}

		if (formValue.periodic) {
			formValue.installments = 1;
		} else {
			formValue.monthInterval = 1;
		}

		formValue.dueDate ??= formValue.purchaseDate;

		this.expenseService.saveExpense(formValue)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response) => {
				if (response.isSuccess) {
					this.feedback.successToast("Feedback.SaveSuccess");
					this.dialogRef.close();
				}

				this.loading = false;
			});
	}

	public showErrorMessage(input: string) {
		if (this.expenseForm) {
			return FormHelper.showErrorMessage(input, this.expenseForm);
		}

		throw 'Form not initialized!';
	}

	public displayFn(category: Category | PaymentMethod) {
		return category?.name ?? '';
	}

	public selectedPaymentMethod($event: MatAutocompleteSelectedEvent) {
		const { dueDate } = $event.option.value as PaymentMethod;

		const today = new Date();
		const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

		if (dueDate) {
			const day = dueDate >= lastDay ? lastDay : dueDate;
			this.expenseForm?.patchValue({ dueDate: new Date(today.getFullYear(), today.getMonth(), day) });
		} else {
			this.expenseForm?.patchValue({ dueDate: null });
		}
	}

	private filterCategories(val: string) {
		if (typeof val !== "string") return this.categories;

		if (this.categories?.find(x => x.name?.toLowerCase() === val.toLowerCase().trim())) {
			this.expenseForm?.get('category')?.setErrors({ 'alreadyExist': true });
		}

		return this.categories?.filter(option => option.name?.toLowerCase().includes(val.toLowerCase()));
	}

	private filterPaymentMethods(val: string) {
		if (typeof val !== "string") return this.paymentMethods;

		if (this.paymentMethods?.find(x => x.name?.toLowerCase() === val.toLowerCase().trim())) {
			this.expenseForm?.get('paymentMethod')?.setErrors({ 'alreadyExist': true });
		}

		return this.paymentMethods?.filter(option => option.name?.toLowerCase().includes(val.toLowerCase()));
	}

	private createForm(expense: Expense): void {
		const formsControl = FormHelper.build(expense, {
			validators: {
				validators: [Validators.required],
				exclude: [
					'dueDate',
					'displayPurchaseDate',
					'displayDueDate',
					'displayDescription',
					'recurrentId',
				],
			},
		});

		// this.expenseForm = new FormGroup(formsControl);
	}
}
