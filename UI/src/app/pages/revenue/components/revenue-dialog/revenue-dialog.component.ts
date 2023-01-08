import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/entities/category/category.model';
import { PaymentMethod } from 'src/app/entities/paymentMethod/paymentMethod.model';
import { Revenue } from 'src/app/entities/revenue/revenue.model';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { RevenueService } from '../../services/revenue.service';

@Component({
	selector: 'revenue-dialog',
	templateUrl: './revenue-dialog.component.html',
	styleUrls: ['./revenue-dialog.component.scss'],

})
export class RevenueDialogComponent implements OnInit {
	public newRevenueForm?: FormGroup;
	public loading: boolean = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public revenue: Revenue,
		private readonly dialogRef: MatDialogRef<RevenueDialogComponent>,
		private readonly homeService: RevenueService,
		private readonly feedback: FeedbackService
	) {}

	public ngOnInit(): void {
		this.createForm(this.revenue ?? new Revenue());
	}

	public submitForm(): void {
		this.loading = true;
		const formValue = this.newRevenueForm?.value as Revenue;

		this.homeService.saveRevenue(formValue).subscribe((response) => {
			if (response.isSuccess) {
				this.feedback.successToast("Feedback.SaveSuccess");
				this.dialogRef.close();
			}

			this.loading = false;
		});
	}

	public showErrorMessage(input: string) {
		if (this.newRevenueForm) {
			return FormHelper.showErrorMessage(input, this.newRevenueForm);
		}

		throw 'Form not initialized!';
	}

	public displayFn(category: Category | PaymentMethod) {
		return category?.name ?? '';
	}

	private createForm(revenue: Revenue): void {
		const formsControl = FormHelper.build(revenue, {
			allValidators: {
				validators: [Validators.required],
				exclude: ['dueDate'],
			}
		});

		this.newRevenueForm = new FormGroup(formsControl);
	}
}
