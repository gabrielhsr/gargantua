using Financial.Data;
using Financial.Data.Models;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services.Base;

namespace Financial.Services.Base
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
