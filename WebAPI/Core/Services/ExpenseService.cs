using Financial.Core.Extensions;
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
                .CalculateInstallment(period)
                .FilterByPeriod(period)
                .CalculateDate(period)
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
