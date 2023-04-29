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
                .Where(income => income.FilterSoloEdit(period, income.PaymentDate, incomes))
                .Where(income => income.FilterByInterval(period, income.PaymentDate));
        }

        public static IEnumerable<Expense> FilterByPeriod(this IEnumerable<Expense> expenses, Period period)
        {
            return expenses
                .Where(expense => expense.Filter(period, expense.DueDate))
                .Where(expense => expense.FilterSoloEdit(period, expense.DueDate, expenses))
                .Where(expense => expense.FilterByInterval(period, expense.DueDate));
        }

        private static bool Filter(this Movement movement, Period period, DateTimeOffset? date)
        {
            return movement.Periodic
                || period.Equals(date)
                || (movement.Installments > 1 && period.EqualOrGreater(date));
        }

        private static bool FilterSoloEdit(this Movement movement, Period period, DateTimeOffset? date, IEnumerable<Movement> movements)
        {
            return !movements.Any(any => any.RecurrentId == movement.Id && period.Equals(date));
        }

        private static bool FilterByInterval(this Movement movement, Period period, DateTimeOffset? date)
        {
            var monthDifference = period.Month - date.Value.Month + 12 * (period.Year - date.Value.Year);

            return monthDifference == 0 || monthDifference % movement.MonthInterval == 0;
        }
    }
}
