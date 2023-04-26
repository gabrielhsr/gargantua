import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Period } from 'src/app/entities/period/period.dto';
import { DateHelper } from '../../helpers/date.helper';
import { PeriodService } from './period-select.service';
import { MatFormFieldAppearance } from '@angular/material/form-field';

interface SortOption {
	text: string;
	value: any;
	order?: 'asc' | 'desc';
}

@Component({
	selector: 'period-select',
	templateUrl: './period-select.component.html',
	styleUrls: ['./period-select.component.scss'],
	providers: [PeriodService]
})
export class PeriodSelectComponent implements OnInit {
	@Output() public periodChange = new EventEmitter<Period>();
	@Output() public filterChange = new EventEmitter<SortOption>();

	@Input() public sortOptions: SortOption[] = [];
	@Input() public appearance: MatFormFieldAppearance = "outline";

	public periods?: Period[];
	public selectedPeriod?: Period;

	private destroy = new Subject();

	constructor(public readonly service: PeriodService) {}

	public ngOnInit() {
		this.service.sortOptions = this.sortOptions;
		this.loadPeriods();
	}

	public ngOnDestroy(): void {
		this.destroy.next(null);
        this.destroy.complete();
	}

	public changeFilter(sortOption: SortOption) {
		this.service.changeSortOption(sortOption);
		this.filterChange.emit(this.service.sortOption.value);
	}

	public compareWith(oldPeriod?: Period, newPeriod?: Period) {
		return oldPeriod?.month === newPeriod?.month && oldPeriod?.year === newPeriod?.year;
	}

	private loadPeriods() {
		this.service.getPeriods().pipe(takeUntil(this.destroy)).subscribe((res) => {
			if (!res.isSuccess) return;

			this.periods = res.value;

			if (this.periods.length) {
				const currentPeriod = DateHelper.PeriodNow();

				const selectedPeriodExist = this.periods.some(period => this.compareWith(period, this.selectedPeriod));
				const currentPeriodExist = this.periods.some(period => this.compareWith(period, currentPeriod));

				if (!selectedPeriodExist) {
					if (currentPeriodExist) {
						this.selectedPeriod = currentPeriod;
					} else {
						this.selectedPeriod = this.periods.at(-1);
					}
				}
			}

			this.periodChange.emit(this.selectedPeriod);
		});
	}
}
