using Financial.Data;
using Financial.Domain.Interfaces.Repositories.Base;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models.Base;

namespace Financial.Core.Services.Base
{
    public class DependencyAggregate<T> : IDependencyAggregate<T> where T : BaseEntity
    {
        public DependencyAggregate(IBaseRepository<T> baseService, IHttpContextAccessor httpContextAccessor, FinancialDbContext dbContext)
        {
            BaseRepository = baseService;
            HttpContextAccessor = httpContextAccessor;
            DbContext = dbContext;
        }

        public IBaseRepository<T> BaseRepository { get; }
        public IHttpContextAccessor HttpContextAccessor { get; }
        public FinancialDbContext DbContext { get; }
    }
}
