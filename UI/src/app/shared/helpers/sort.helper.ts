import { Expense } from "src/app/entities/expense/expense.model";
import { Income } from "src/app/entities/income/income.model";

export const sortingExpenseDataAccessor: any = (item: Expense, property: keyof Expense) => {
	switch (property) {
		case 'paymentMethod':
			return item.paymentMethod?.name;
		case 'category':
			return item.category?.name;
		default:
			return item[property];
	}
};

export const sortingIncomeDataAccessor: any = (item: Income, property: keyof Income) => {
	switch (property) {
		default:
			return item[property];
	}
};
