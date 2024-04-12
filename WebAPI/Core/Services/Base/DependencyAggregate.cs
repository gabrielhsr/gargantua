using Financial.Data;
using Financial.Domain.Interfaces.Providers;
using Financial.Domain.Interfaces.Repositories.Base;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Models.Base;

namespace Financial.Core.Services.Base
{
    public class DependencyAggregate<T> : IDependencyAggregate<T> where T : BaseEntity
    {
        public DependencyAggregate(IBaseRepository<T> baseRepository, IUserProvider userProvider, FinancialDbContext dbContext)
        {
            BaseRepository = baseRepository;
            UserProvider = userProvider;
            DbContext = dbContext;
        }

        public IBaseRepository<T> BaseRepository { get; }
        public IUserProvider UserProvider { get; }
        public FinancialDbContext DbContext { get; }
    }
}
