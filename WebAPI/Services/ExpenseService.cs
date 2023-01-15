using Financial.Data;
using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Helpers;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace Financial.Services
{
    public class ExpenseService : BaseService<Expense>, IExpenseService
    {
        private readonly FinancialDbContext context;

        public ExpenseService(IBaseRepository<Expense> repository, FinancialDbContext context) : base(repository)
        {
            this.context = context;
        }

        public override async Task<Expense> SaveAsync(Guid id, Expense entity)
        {
            if (entity.Category.Id != Guid.Empty) context.Entry(entity.Category).State = EntityState.Unchanged;
            if (entity.PaymentMethod.Id != Guid.Empty) context.Entry(entity.PaymentMethod).State = EntityState.Unchanged;

            entity.DueDate ??= entity.PurchaseDate;

            return await base.SaveAsync(id, entity);
        }

        public async Task<IList<Period>> GetPeriods()
        {
            var expenses = await base.GetAllAsync();

            var periods = expenses
                .Where(x => x.DueDate is not null)
                .OrderBy(x => x.DueDate)
                .Select(x => new Period { Month = x.DueDate!.Value.Month, Year = x.DueDate!.Value.Year })
                .Distinct()
                .ToList();

            return periods;
        }

        public async Task<IList<Expense>> GetExpensesByPeriod(Period period)
        {
            var expenses = await base.GetAllAsync();

            var expensesByPeriod = expenses
                .Where(expense => expense.DueDate.HasValue && period.Equals(expense.DueDate.Value))
                .OrderBy(expense => expense.DueDate)
                .ToList();

            return expensesByPeriod;
        }
    }
}
