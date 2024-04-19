import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { Months, Period } from 'src/app/domain/period/period.model';

@Component({
    selector: 'period-select',
    templateUrl: './period-select.component.html',
    styleUrls: ['./period-select.component.scss']
})
export class PeriodSelectComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    protected periodForm = new FormGroup({
        Month: new FormControl<string | null>(null, Validators.required),
        Year: new FormControl<string | null>(null, Validators.required)
    });

    protected years = ['2024', '2025'];

    @Input() public appearance: MatFormFieldAppearance = 'outline';
    @Input() public fillCurrentDate: boolean = false;

    @Output() public periodChange = new EventEmitter<Period>();

    protected get months(): string[] {
        return Object.keys(Months).filter((month) => isNaN(Number(month)));
    }

    public ngOnInit(): void {
        if (this.fillCurrentDate) {
            const current = new Date();
            const month = Months[current.getMonth()];
            const year = current.getFullYear();

            this.periodForm.patchValue({ Month: month, Year: year.toString() });
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    protected emitEvent(): void {
        const formValue = this.periodForm.value as Period;

        this.periodChange.emit(formValue);
    }
}
