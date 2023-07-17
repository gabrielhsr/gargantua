using Financial.v2.Data;
using Financial.v2.Domain.Interfaces.Repositories.Base;
using Financial.v2.Domain.Interfaces.Services.Base;
using Financial.v2.Domain.Models.Base;

namespace Financial.v2.Core.Services.Base
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
