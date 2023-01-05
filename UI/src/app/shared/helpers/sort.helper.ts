import { Expense } from "src/app/entities/expense/expense.model";
import { Revenue } from "src/app/entities/revenue/revenue.model";

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

export const sortingRevenueDataAccessor: any = (item: Revenue, property: keyof Revenue) => {
	switch (property) {
		default:
			return item[property];
	}
};
