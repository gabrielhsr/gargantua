using Gargantua.Domain.Entities;
using Gargantua.Domain.Extensions;
using Gargantua.Domain.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace Gargantua.Service.Services
{
    public class ExpenseService : BaseService<Expense, Guid>, IExpenseService
    {
        private readonly DbContext dbContext;

        public ExpenseService(IDependencyAggregate<Expense, Guid> dependencyAggregate) : base(dependencyAggregate)
        {
            dbContext = dependencyAggregate.DbContext;
        }

        public override Task<Expense> SaveAsync(Guid id, Expense entity)
        {
            if (!entity.Category.Id.IsNullOrDefault())
            {
                dbContext.Entry(entity.Category).State = EntityState.Unchanged;
            }

            if (!entity.PaymentMethod.Id.IsNullOrDefault())
            {
                dbContext.Entry(entity.PaymentMethod).State = EntityState.Unchanged;
            }

            return base.SaveAsync(id, entity);
        }
    }
}
