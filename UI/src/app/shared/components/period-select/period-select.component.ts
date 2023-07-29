import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Months, Period } from 'src/app/domain/period/period.model';

import { FormHelper } from '../../helpers/form.helper';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { PeriodService } from './period-select.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'period-select',
	templateUrl: './period-select.component.html',
	styleUrls: ['./period-select.component.scss'],
	providers: [PeriodService]
})
export class PeriodSelectComponent implements OnInit {
	@Input() public appearance: MatFormFieldAppearance = "outline";
	@Input() public fillCurrentDate: boolean = false;

	@Output() public periodChange = new EventEmitter<Period>();

	public periodForm = FormHelper.build(new Period(), { validators: [Validators.required] });
	public years = [2023, 2024];

	private destroy$ = new Subject<void>();

	constructor(public readonly service: PeriodService) {}

	public get months() {
		return Object.keys(Months).filter(month => isNaN(Number(month)));
	}

	public ngOnInit() {
		if (this.fillCurrentDate) {
			const current = new Date();
			const month = Months[current.getMonth() - 1];
			const year = current.getFullYear();

			this.periodForm.patchValue({ month, year });
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
        this.destroy$.complete();
	}

	public emitEvent() {
		this.periodChange.emit(this.periodForm.value);
	}
}
