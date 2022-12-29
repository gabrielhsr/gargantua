using Financial.Data;
using Financial.Data.DTO;
using Financial.Data.Models;
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
            context.Entry(entity.Category).State = EntityState.Unchanged;
            context.Entry(entity.PaymentMethod).State = EntityState.Unchanged;

            entity.DueDate ??= entity.PurchaseDate;

            return await base.SaveAsync(id, entity);
        }

        public async Task<IList<PeriodDto>> GetPeriods()
        {
            var expenses = await base.GetAllAsync();

            var years = expenses
                .Where(x => x.DueDate is not null)
                .OrderBy(x => x.DueDate)
                .Select(x => new PeriodDto { Month = x.DueDate!.Value.Month, Year = x.DueDate!.Value.Year })
                .Distinct()
                .ToList();

            return years;
        }

        public async Task<IList<Expense>> GetExpensesByPeriod(PeriodDto period)
        {
            var expenses = await base.GetAllAsync();

            var expensesByPeriod = expenses
                .Where(x => x.DueDate is not null)
                .Where(x => x.DueDate!.Value.Month == period.Month && x.DueDate!.Value.Year == period.Year)
                .OrderBy(x => x.DueDate)
                .ToList();

            return expensesByPeriod;
        }
    }
}
