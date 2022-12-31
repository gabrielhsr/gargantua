import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Expense } from 'src/app/entities/expense/expense.model';
import { Period } from 'src/app/entities/period/period.dto';
import { toTitleCase } from 'src/app/shared/helpers/string.helper';
import { ExpenseService } from '../../../services/expense.service';

export interface SortOption {
	text: string;
	value: keyof Expense;
	order?: 'asc' | 'desc';
}

@Component({
	selector: 'app-period-select',
	templateUrl: './period-select.component.html',
	styleUrls: ['./period-select.component.scss'],
})
export class PeriodSelectComponent implements OnInit {
	@Output() public periodChange = new EventEmitter<Period>();
	@Output() public sort = new EventEmitter<SortOption>();

	@Input() public displayedColumns: string[] = [];

	public periods?: Period[];
	public selectedPeriod?: Period;

	public sortOptions?: SortOption[];

	constructor(private readonly expenseService: ExpenseService) {}

	public ngOnInit() {
		this.setSortOptions();

		this.expenseService.getPeriods().subscribe((res) => {
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

				this.periodChange.emit(this.selectedPeriod);
			}
		});
	}

	public emitSort(option: SortOption) {
		if (!this.sortOptions) return;

		const alreadySelectedItem = this.sortOptions.find(x => x.order);

		if (alreadySelectedItem) {
			const selectedItemIndex = this.sortOptions.indexOf(alreadySelectedItem);
			let selectedItemReseted: SortOption = { text: alreadySelectedItem.text, value: alreadySelectedItem.value };

			if (option.value === alreadySelectedItem.value) {
				selectedItemReseted = { ...selectedItemReseted, order: option.order === 'asc' ? 'desc' : 'asc' };

				this.sort.emit(selectedItemReseted);
			}

			this.sortOptions[selectedItemIndex] = selectedItemReseted;
		}

		const newItemIndex = this.sortOptions.indexOf(option);

		if (newItemIndex > -1) {
			const newItem: SortOption = { ...option, order: 'asc' };

			this.sortOptions[newItemIndex] = newItem;

			this.sort.emit(newItem);
		}
	}

	public selectionChange(event: MatSelectChange) {
		const period = event.value as Period;

		this.setSortOptions();
		this.periodChange.emit(period);
	}

	private setSortOptions() {
		this.sortOptions = this.displayedColumns
			.filter((x) => x !== 'options')
			.map((x) => {
				const defaultOption: SortOption = { text: `Pages.Home.${toTitleCase(x)}`, value: x as keyof Expense };

				return x === 'purchaseDate' ? {...defaultOption, order: 'asc' } : defaultOption;
			});
	}
}
