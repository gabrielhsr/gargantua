import { Expense } from 'src/app/domain/expense/expense.model';
import { Income } from 'src/app/domain/income/income.model';

export type SortRes = string | number | boolean | Date | null | undefined;

export const sortingExpenseDataAccessor = (item: Expense, property: keyof Expense): SortRes => {
    switch (property) {
        case 'paymentMethod':
            return item.paymentMethod?.name;
        case 'category':
            return item.category?.name;
        default:
            return item[property];
    }
};

export const sortingIncomeDataAccessor = (item: Income, property: keyof Income): SortRes => {
    switch (property) {
        default:
            return item[property];
    }
};
