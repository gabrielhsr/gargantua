import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeriodEndpoint } from 'src/app/entities/period/period.endpoint';

export interface SortOption {
	text: string;
	value: any;
	order?: 'asc' | 'desc';
}

@Injectable({
	providedIn: 'root',
})
export class PeriodService {
	public sortOptions?: SortOption[];
	public sortOption = new BehaviorSubject<SortOption | undefined>(undefined);

	constructor(private readonly periodEndpoint: PeriodEndpoint) {}

	public getPeriods() {
		return this.periodEndpoint.getPeriods();
	}

	public changeSortOption(sortOption: SortOption) {
		if (!this.sortOptions) throw new Error("SortOptions not setted!");

		const indexOption = this.sortOptions.indexOf(sortOption);

		this.sortOptions = this.sortOptions.map((option, index) => {
			return indexOption === index ? { ...option, order: option?.order === 'asc' ? 'desc' : 'asc' } : { ...option, order: undefined };
		})

		this.sortOption.next(this.sortOptions[indexOption]);
	}
}
