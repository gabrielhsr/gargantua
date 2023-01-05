import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Period } from 'src/app/entities/period/period.dto';
import { Revenue } from 'src/app/entities/revenue/revenue.model';
import { toTitleCase } from 'src/app/shared/helpers/string.helper';
import { RevenueService } from '../../../services/revenue.service';

export interface SortOption {
	text: string;
	value: keyof Revenue;
	order?: 'asc' | 'desc';
}

@Component({
	selector: 'revenue-period-select',
	templateUrl: './period-select.component.html',
	styleUrls: ['./period-select.component.scss'],
})
export class RevenuePeriodSelectComponent implements OnInit {
	@Output() public periodChange = new EventEmitter<Period>();

	@Input() public displayedColumns: string[] = [];

	public periods?: Period[];
	public selectedPeriod?: Period;

	constructor(public readonly revenueService: RevenueService) {}

	public ngOnInit() {
		this.revenueService.sortOptions = this.getSortOptions();
		this.loadPeriods();
	}

	private loadPeriods() {
		this.revenueService.getPeriods().subscribe((res) => {
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

	private getSortOptions(): SortOption[] {
		return this.displayedColumns
			.filter((x) => x !== 'options')
			.map((x) => {
				const defaultOption: SortOption = {
					text: `Pages.Revenue.${toTitleCase(x)}`,
					value: x as keyof Revenue,
				};

				return x === 'paymentDate' ? { ...defaultOption, order: 'asc' } : defaultOption;
			});
	}
}
