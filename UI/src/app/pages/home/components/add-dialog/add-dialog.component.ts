import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/entities/expense/expense.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { HomeService } from '../../home.service';

@Component({
	selector: 'app-add-dialog',
	templateUrl: './add-dialog.component.html',
	styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
	public categories = this.homeService.getCategories();
	public paymentMethods = this.homeService.getPaymentMethods();

	public newExpenseForm!: FormGroup;

	constructor(private readonly homeService: HomeService) {}

	public ngOnInit(): void {
		this.createForm(new Expense());
	}

	public submitForm() {
		console.log(this.newExpenseForm.value);
	}

	private createForm(expense: Expense) {
		const formsControl = FormHelper.Build({ object: expense, exclude: ['id'] });

		this.newExpenseForm = new FormGroup(formsControl);
	}
}
