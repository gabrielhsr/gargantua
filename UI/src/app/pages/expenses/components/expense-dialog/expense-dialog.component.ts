import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/entities/category/category.model';
import { Expense } from 'src/app/entities/expense/expense.model';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { GuidHelper } from 'src/app/shared/helpers/guid.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ExpenseService } from '../../services/expense.service';

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

	public filteredCategories?: Observable<Category[] | undefined>;
	public filteredPaymentMethods?: Observable<PaymentMethod[] | undefined>;

	private destroy = new Subject();

	constructor(
		@Inject(MAT_DIALOG_DATA) public expense: Expense,
		private readonly dialogRef: MatDialogRef<ExpenseDialogComponent>,
		private readonly expenseService: ExpenseService,
		private readonly feedback: FeedbackService
	) {
		forkJoin({
			categories: this.expenseService.getCategories(),
			paymentMethods: this.expenseService.getPaymentMethods(),
		})
			.pipe(takeUntil(this.destroy))
			.subscribe(({ categories, paymentMethods }) => {
				if (categories.isSuccess && paymentMethods.isSuccess) {
					this.categories = categories.value;
					this.paymentMethods = paymentMethods.value;

					this.loading = false;
				}
			});
	}

	public ngOnInit(): void {
		this.createForm(this.expense ?? new Expense());

		this.filteredCategories = this.expenseForm?.get('category')?.valueChanges.pipe(startWith(''), map(val => this.filterCategories(val)));
		this.filteredPaymentMethods = this.expenseForm?.get('paymentMethod')?.valueChanges.pipe(startWith(''), map(val => this.filterPaymentMethods(val)));
	}

	public ngOnDestroy(): void {
		this.destroy.next(null);
        this.destroy.complete();
	}

	public submitForm(): void {
		this.loading = true;
		const formValue = this.expenseForm?.value as Expense;

		if (typeof formValue.category === "string") {
			formValue.category = { name: formValue.category, id: GuidHelper.default }
		}

		if (typeof formValue.paymentMethod === "string") {
			formValue.paymentMethod = { name: formValue.paymentMethod, id: GuidHelper.default }
		}

		this.expenseService.saveExpense(formValue)
			.pipe(takeUntil(this.destroy))
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

	public detailExpense($event: Event) {
		$event.preventDefault();
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
			allValidators: {
				validators: [Validators.required],
				exclude: ['dueDate'],
			}
		});

		this.expenseForm = new FormGroup(formsControl);
	}
}
