import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/entities/expense/expense.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { HomeService } from '../../home.service';

interface Test {
	dueDate: FormControl;
	purchaseDate: FormControl;
	category: FormControl;
	paymentMethod: FormControl;
	description: FormControl;
	amount: FormControl;
}

@Component({
	selector: 'app-add-dialog',
	templateUrl: './add-dialog.component.html',
	styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
	public categories = this.homeService.getCategories();
	public paymentMethods = this.homeService.getPaymentMethods();

	public newExpenseForm!: FormGroup;
	isLoading: boolean = false;

	constructor(private readonly homeService: HomeService) {}

	public ngOnInit(): void {
		this.createForm(new Expense());
	}

	public test() {
		this.isLoading = !this.isLoading;
	}

	public submitForm(): void {
		const formValue = this.newExpenseForm.value as Expense;

		this.homeService
			.saveExpense(formValue)
			.subscribe({
				error: (error) => console.log(error),
				complete: () => console.log('success'),
			});
	}

	private createForm(expense: Expense): void {
		const formsControl = FormHelper.build({ object: expense, exclude: ['id'] });

		this.newExpenseForm = new FormGroup(formsControl);
	}
}


