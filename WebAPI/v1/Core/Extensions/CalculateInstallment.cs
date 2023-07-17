using Financial.v1.Domain.DTO;
using Financial.v1.Domain.Models;

namespace Financial.v1.Core.Extensions
{
    /// <summary>
    /// Calculate installment based on period and changes description. Ex: Car Fix (2/10)
    /// </summary>
    public static class CalculateInstallmentExtension
    {
        public static IEnumerable<Income> CalculateInstallment(this IEnumerable<Income> incomes, Period period)
        {
            return incomes.Select(income => income.CalculateIncome(period, incomes)).ToList();
        }

        public static IEnumerable<Expense> CalculateInstallment(this IEnumerable<Expense> expenses, Period period)
        {
            return expenses.Select(expense => expense.CalculateExpense(period, expenses)).ToList();
        }

        private static Income CalculateIncome(this Income income, Period period, IEnumerable<Income> incomes)
        {
            var finalCharge = income.PaymentDate.AddMonths(income.Installments - 1); // Less one because the dueDate count as an Installment
            income.DisplayDescription = income.Description;

            if (income.Installments > 1)
            {
                var monthEdit = incomes.FirstOrDefault(edit => edit.Id == income.RecurrentId);
                var currentCharge = finalCharge.Month - period.Month + 12 * (finalCharge.Year - period.Year);

                income.DisplayDescription += $" ({income.Installments - currentCharge}/{income.Installments})";

                if (monthEdit?.DisplayDescription != null)
                {
                    income.DisplayDescription = monthEdit.DisplayDescription;
                }
            }

            return income;
        }

        private static Expense CalculateExpense(this Expense expense, Period period, IEnumerable<Expense> expenses)
        {
            var finalCharge = expense.DueDate.AddMonths(expense.Installments - 1); // Less one because the dueDate count as an Installment
            expense.DisplayDescription = expense.Description;

            if (expense.Installments > 1)
            {
                var monthEdit = expenses.FirstOrDefault(edit => edit.Id == expense.RecurrentId);
                var currentCharge = finalCharge.Month - period.Month + 12 * (finalCharge.Year - period.Year);

                expense.DisplayDescription += $" ({expense.Installments - currentCharge}/{expense.Installments})";

                if (monthEdit?.DisplayDescription != null)
                {
                    expense.DisplayDescription = monthEdit.DisplayDescription;
                }
            }

            return expense;
        }
    }
}
