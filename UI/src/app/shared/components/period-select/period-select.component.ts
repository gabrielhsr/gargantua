import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { Months, Period } from 'src/app/domain/period/period.model';
import { FormHelper } from '../../helpers/form.helper';

@Component({
	selector: 'period-select',
	templateUrl: './period-select.component.html',
	styleUrls: ['./period-select.component.scss']
})
export class PeriodSelectComponent implements OnInit {
	@Input() public appearance: MatFormFieldAppearance = "outline";
	@Input() public fillCurrentDate: boolean = false;

	@Output() public periodChange = new EventEmitter<Period>();

	protected periodForm = FormHelper.build(new Period(), { validators: [Validators.required] });
	protected years = [2024, 2025];

	private readonly destroy$ = new Subject<void>();

	constructor() {}

	protected get months() {
		return Object.keys(Months).filter(month => isNaN(Number(month)));
	}

	public ngOnInit() {
		if (this.fillCurrentDate) {
			const current = new Date();
			const month = Months[current.getMonth()];
			const year = current.getFullYear();

			this.periodForm.patchValue({ month, year });
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
        this.destroy$.complete();
	}

	protected emitEvent() {
		this.periodChange.emit(this.periodForm.value);
	}
}
