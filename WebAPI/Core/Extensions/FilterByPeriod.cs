using Financial.Domain.DTO;
using Financial.Domain.Models;
using System.Linq.Expressions;

namespace Financial.Core.Extensions
{
    public static class FilterByPeriodExtension
    {
        public static IEnumerable<Income> FilterByPeriod(this IEnumerable<Income> incomes, Period period)
        {
            return incomes
                .Where(income => income.Filter(period, income.PaymentDate))
                .Where(income => income.FilterPeriodicIncomeSoloEdit(period, incomes))
                .Where(income => income.FilterInstallmentIncomeSoloEdit(period, incomes))
                .Where(income => income.FilterByInterval(period, income.PaymentDate));
        }

        public static IEnumerable<Expense> FilterByPeriod(this IEnumerable<Expense> expenses, Period period)
        {
            return expenses
                .Where(expense => expense.Filter(period, expense.DueDate))
                .Where(expense => expense.FilterPeriodicExpenseSoloEdit(period, expenses))
                .Where(expense => expense.FilterInstallmentExpenseSoloEdit(period, expenses))
                .Where(expense => expense.FilterByInterval(period, expense.DueDate));
        }

        private static bool Filter(this Movement movement, Period period, DateTimeOffset? date)
        {
            var finalCharge = date.Value.AddMonths(movement.Installments - 1);

            return movement.Periodic 
                || period.Equals(date) 
                || (movement.Installments > 1 && period.InRange(date, finalCharge));
        }

        private static bool FilterPeriodicExpenseSoloEdit(this Expense expense, Period period, IEnumerable<Expense> expenses)
        {
            var monthEdit = expenses.FirstOrDefault(edit => edit.RecurrentId == expense.Id && period.Equals(edit.DueDate));

            return !expenses.Any(any => any.RecurrentId == expense.Id && period.Equals(monthEdit?.DueDate));
        }

        private static bool FilterInstallmentExpenseSoloEdit(this Expense expense, Period period, IEnumerable<Expense> expenses)
        {
            var monthEdit = expenses.FirstOrDefault(edit => edit.Id == expense.RecurrentId);

            return monthEdit == null
                || expense.Installments == 1
                || period.Equals(expense.DueDate)
                || period.Equals(monthEdit.DueDate);
        }

        private static bool FilterPeriodicIncomeSoloEdit(this Income income, Period period, IEnumerable<Income> incomes)
        {
            var monthEdit = incomes.FirstOrDefault(edit => edit.RecurrentId == income.Id && period.Equals(edit.PaymentDate));

            return !incomes.Any(any => any.RecurrentId == income.Id && period.Equals(monthEdit?.PaymentDate));
        }

        private static bool FilterInstallmentIncomeSoloEdit(this Income income, Period period, IEnumerable<Income> incomes)
        {
            var monthEdit = incomes.FirstOrDefault(edit => edit.Id == income.RecurrentId);

            return monthEdit == null 
                || income.Installments == 1 
                || period.Equals(income.PaymentDate)
                || period.Equals(monthEdit.PaymentDate);
        }

        private static bool FilterByInterval(this Movement movement, Period period, DateTimeOffset? date)
        {
            var monthDifference = period.Month - date.Value.Month + 12 * (period.Year - date.Value.Year);

            return monthDifference == 0 || monthDifference % movement.MonthInterval == 0;
        }
    }
}
