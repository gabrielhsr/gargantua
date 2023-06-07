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

                if (expense.Periodic)
                {
                    var purchaseYearDiff = period.Year - expense.PurchaseDate.Year;
                    var purchaseMonthDiff = period.Month - expense.PurchaseDate.Month;

                    expense.DisplayPurchaseDate = expense.PurchaseDate.AddMonths(purchaseMonthDiff - 1).AddYears(purchaseYearDiff);
                    expense.DisplayDueDate = expense.DueDate.AddMonths(purchaseMonthDiff - 1).AddYears(purchaseYearDiff);
                };

                if (expense.Installments > 1)
                {
                    var dueYearDiff = period.Year - expense.DueDate.Year;
                    var dueMonthDiff = period.Month - expense.DueDate.Month;

                    expense.DisplayDueDate = expense.DueDate.AddMonths(dueMonthDiff).AddYears(dueYearDiff);
                };

                return expense;
            });
        }
    }
}
