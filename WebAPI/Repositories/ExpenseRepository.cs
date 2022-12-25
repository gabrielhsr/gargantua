using Financial.Data;
using Financial.Interfaces.Repositories;
using Financial.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Financial.Repositories
{
    public class ExpenseRepository : BaseRepository<Expense>, IExpenseRepository
    {
        private readonly FinancialDbContext context;

        public ExpenseRepository(FinancialDbContext context) : base(context)
        {
            this.context = context;
        }

        public override Task<Expense> SaveAsync(Guid id, Expense entity)
        {
            context.Entry(entity.Category).State = EntityState.Unchanged;
            context.Entry(entity.PaymentMethod).State = EntityState.Unchanged;

            return base.SaveAsync(id, entity);
        }
    }
}
