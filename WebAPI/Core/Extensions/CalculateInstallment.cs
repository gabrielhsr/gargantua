using Financial.Core.Helpers;
using Financial.Domain.DTO;
using Financial.Domain.Models;

namespace Financial.Core.Extensions
{
    /// <summary>
    /// Calculate installment based on period and changes description. Ex: Car Fix (2/10)
    /// </summary>
    public static class CalculateInstallmentExtension
    {
        public static IEnumerable<Income> CalculateInstallment(this IEnumerable<Income> incomes, Period period)
        {
            return incomes.Select(income => income.Calculate<Income>(period, income.PaymentDate));
        }

        public static IEnumerable<Expense> CalculateInstallment(this IEnumerable<Expense> expenses, Period period)
        {
            return expenses.Select(expense => expense.Calculate<Expense>(period, expense.PurchaseDate));
        }

        private static T Calculate<T>(this Movement movement, Period period, DateTimeOffset date) where T : Movement
        {
            var lastCharge = date.AddMonths(movement.Installments - 1);
            movement.DisplayDescription = movement.Description;

            if (DateHelper.InTimeRange(period, date, lastCharge) && movement.Installments > 1)
            {
                var currentCharge = lastCharge.Month - period.Month + 12 * (lastCharge.Year - period.Year);

                movement.DisplayDescription += $" ({movement.Installments - currentCharge}/{movement.Installments})";
            }

            return (T)movement;
        }
    }
}
