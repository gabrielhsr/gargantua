import { Expense } from "src/app/entities/expense/expense.model";

export const sortingDataAccessor: any = (item: Expense, property: keyof Expense) => {
	switch (property) {
		case 'paymentMethod':
			return item.paymentMethod?.name;
		case 'category':
			return item.category?.name;
		default:
			return item[property];
	}
};
