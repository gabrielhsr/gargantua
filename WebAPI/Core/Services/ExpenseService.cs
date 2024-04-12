using Financial.Core.Common.Extensions;
using Financial.Core.Services.Base;
using Financial.Data;
using Financial.Domain.Interfaces.Providers;
using Financial.Domain.Interfaces.Services;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Financial.Core.Services
{
    public class ExpenseService : BaseService<Expense>, IExpenseService
    {
        private readonly IUserProvider userProvider;
        private readonly FinancialDbContext dbContext;

        public ExpenseService(IDependencyAggregate<Expense> dependencyAggregate) : base(dependencyAggregate)
        {
            this.dbContext = dependencyAggregate.DbContext;
            this.userProvider = dependencyAggregate.UserProvider;
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

            entity.IdUser = IdUser;

            return base.SaveAsync(id, entity);
        }
    }
}
