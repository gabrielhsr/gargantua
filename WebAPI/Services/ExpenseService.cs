using Financial.Data;
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
    }
}
