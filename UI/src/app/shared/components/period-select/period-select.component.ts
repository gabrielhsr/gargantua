import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Period } from 'src/app/entities/period/period.dto';
import { PeriodService } from '../../services/period.service';

interface SortOption {
	text: string;
	value: any;
	order?: 'asc' | 'desc';
}

@Component({
	selector: 'period-select',
	templateUrl: './period-select.component.html',
	styleUrls: ['./period-select.component.scss'],
})
export class PeriodSelectComponent implements OnInit {
	@Output() public periodChange = new EventEmitter<Period>();
	@Output() public filterChange = new EventEmitter<SortOption>();

	@Input() public sortOptions: SortOption[] = [];

	public periods?: Period[];
	public selectedPeriod?: Period;

	constructor(public readonly periodService: PeriodService) {}

	public ngOnInit() {
		this.periodService.sortOptions = this.sortOptions;
		this.loadPeriods();
	}

	public changeFilter(sortOption: SortOption) {
		this.periodService.changeSortOption(sortOption);
		this.filterChange.emit(this.periodService.sortOption.value);
	}

	private loadPeriods() {
		this.periodService.getPeriods().subscribe((res) => {
			if (!res.isSuccess) return;

			this.periods = res.value;

			if (this.periods.length) {
				const currentMonth = new Date().getMonth() + 1;
				const currentYear = new Date().getFullYear();

				const currentPeriod = this.periods.find(({ month, year }) => month === currentMonth && year === currentYear);

				if (currentPeriod) {
					this.selectedPeriod = currentPeriod;
				} else {
					this.selectedPeriod = this.periods.at(-1);
				}
			}

			this.periodChange.emit(this.selectedPeriod);
		});
	}
}
