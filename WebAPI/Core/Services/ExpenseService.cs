using Financial.Core.Helpers;
using Financial.Core.Services.Base;
using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Financial.Core.Services
{
    public class ExpenseService : BaseService<Expense>, IExpenseService
    {
        public ExpenseService(IDependencyAggregate<Expense> aggregate) : base(aggregate) { }

        public override async Task<Expense> SaveAsync(Guid id, Expense entity)
        {
            if (entity.Category.Id != Guid.Empty) repository.Context.Entry(entity.Category).State = EntityState.Unchanged;
            if (entity.PaymentMethod.Id != Guid.Empty) repository.Context.Entry(entity.PaymentMethod).State = EntityState.Unchanged;

            if (entity.Periodic) entity.Installments = 1;

            entity.DueDate ??= entity.PurchaseDate;
            entity.User = await repository.Context.Set<User>().FindAsync(UserId);

            return await base.SaveAsync(id, entity);
        }

        public override async Task RemoveAsync(Guid id)
        {
            var expense = await GetByIdAsync(id);

            if (expense.RecurrentId is not null)
            {
                await base.RemoveAsync((Guid)expense.RecurrentId);
            }

            await base.RemoveAsync(id);
        }

        public async Task<IList<Period>> GetPeriods()
        {
            var expenses = await base.GetAllAsync();

            var periods = expenses
                .Where(expense => expense.User.Id == UserId)
                .Where(x => x.DueDate is not null)
                .OrderBy(x => x.DueDate)
                .Select(x => new Period { Month = x.DueDate!.Value.Month, Year = x.DueDate!.Value.Year })
                .Distinct()
                .ToList();

            return periods;
        }

        public async Task<IList<Expense>> GetExpensesByPeriod(Period period)
        {
            var allExpenses = await base.GetAllAsync();

            var expensesByPeriod = allExpenses
                .Where(expense => expense.User.Id == UserId) // Filter by logged used
                .Select(expense =>
                {
                    // Calculate installment based on selected period and changes description. Ex: Car Fix (2/10)
                    var lastCharge = expense.PurchaseDate.AddMonths(expense.Installments - 1);
                    expense.DisplayDescription = expense.Description;

                    if (DateHelper.InTimeRange(period, expense.PurchaseDate, lastCharge) && expense.Installments > 1)
                    {
                        var currentCharge = lastCharge.Month - period.Month + 12 * (lastCharge.Year - period.Year);

                        expense.DisplayDescription += $" ({expense.Installments - currentCharge}/{expense.Installments})";
                    }

                    return expense;
                })
                .Where(expense => expense.Periodic || period.Equals(expense.DueDate) || (expense.Installments > 1 && period.EqualOrGreater(expense.DueDate))) // Filter if it's periodic OR is the selected period OR have more than one installment and is the selected period or greater
                .Where(expense => !allExpenses.Any(any => any.RecurrentId == expense.Id && period.Equals(any.PurchaseDate))) // Filter to check if a Income is part of a periodic income and has been solo edited
                .Select(expense =>
                {
                    // Calculate the date based on selected period
                    if (expense.Periodic || expense.Installments > 1)
                    {
                        var purchaseYearDiff = period.Year - expense.PurchaseDate.Year;
                        var purchaseMonthDiff = period.Month - expense.PurchaseDate.Month;

                        var dueYearDiff = expense.DueDate.HasValue ? period.Year - (int)expense.DueDate?.Year : 0;
                        var dueMonthDiff = expense.DueDate.HasValue ? period.Month - (int)expense.DueDate?.Month : 0;

                        expense.PurchaseDate = expense.PurchaseDate.AddMonths(purchaseMonthDiff).AddYears(purchaseYearDiff);
                        expense.DueDate = expense.DueDate?.AddMonths(dueMonthDiff).AddYears(dueYearDiff);
                    };

                    return expense;
                })
                .OrderBy(expense => expense.DueDate) // Order by due date
                .ToList();

            return expensesByPeriod;
        }

        public async Task MarkAsPaid(IList<ExpensePaid> expenses)
        {
            foreach (var expense in expenses)
            {
                var storedExpense = await GetByIdAsync(expense.Id);

                storedExpense.Paid = expense.Paid;
            }

            await repository.Context.SaveChangesAsync();
        }
    }
}
