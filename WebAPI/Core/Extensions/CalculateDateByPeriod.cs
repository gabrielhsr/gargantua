using Financial.Core.Helpers;
using Financial.Domain.DTO;
using Financial.Domain.Models;

namespace Financial.Core.Extensions
{
    /// <summary>
    /// Calculate the date based on selected period.
    /// </summary>
    public static class CalculateDateByPeriod
    {
        public static IEnumerable<Income> CalculateDate(this IEnumerable<Income> incomes, Period period)
        {
            return incomes.Select(income =>
            {
                income.DisplayPaymentDate = income.PaymentDate;

                if (income.Periodic || income.Installments > 1)
                {
                    var yearDiff = period.Year - income.PaymentDate.Year;
                    var monthDiff = period.Month - income.PaymentDate.Month;

                    income.DisplayPaymentDate = income.PaymentDate.AddMonths(monthDiff).AddYears(yearDiff);
                };

                return income;
            });
        }

        public static IEnumerable<Expense> CalculateDate(this IEnumerable<Expense> expenses, Period period)
        {
            return expenses.Select(expense =>
            {
                expense.DisplayDueDate = expense.DueDate;
                expense.DisplayPurchaseDate = expense.PurchaseDate;

                if (expense.Periodic || expense.Installments > 1)
                {
                    var purchaseYearDiff = period.Year - expense.PurchaseDate.Year;
                    var purchaseMonthDiff = period.Month - expense.PurchaseDate.Month;

                    var dueYearDiff = expense.DueDate.HasValue ? period.Year - (int)expense.DueDate?.Year : 0;
                    var dueMonthDiff = expense.DueDate.HasValue ? period.Month - (int)expense.DueDate?.Month : 0;

                    expense.DisplayPurchaseDate = expense.PurchaseDate.AddMonths(purchaseMonthDiff).AddYears(purchaseYearDiff);
                    expense.DisplayDueDate = expense.DueDate?.AddMonths(dueMonthDiff).AddYears(dueYearDiff);
                };

                return expense;
            });
        }
    }
}
