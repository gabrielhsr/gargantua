import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Period } from 'src/app/entities/period/period.dto';
import { PeriodService } from './period-select.service';

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

	public periods?: Period[];
	public selectedPeriod?: Period;

	constructor(public readonly service: PeriodService) {}

	public ngOnInit() {
		this.service.sortOptions = this.sortOptions;
		this.loadPeriods();
	}

	public changeFilter(sortOption: SortOption) {
		this.service.changeSortOption(sortOption);
		this.filterChange.emit(this.service.sortOption.value);
	}

	public compareWith(oldPeriod: Period, newPeriod: Period) {
		return oldPeriod.month === newPeriod.month && oldPeriod.year === newPeriod.year;
	}

	private loadPeriods() {
		this.service.getPeriods().subscribe((res) => {
			if (!res.isSuccess) return;

			this.periods = res.value;

			if (this.periods.length && !this.selectedPeriod) {
				const month = new Date().getMonth() + 1;
				const year = new Date().getFullYear();

				const currentPeriod: Period = { month, year };

				if (this.periods.find(period => this.compareWith(period, currentPeriod))) {
					this.selectedPeriod = currentPeriod;
				} else {
					this.selectedPeriod = this.periods.at(-1);
				}
			}

			this.periodChange.emit(this.selectedPeriod);
		});
	}
}
