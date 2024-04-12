using Financial.Data;
using Financial.Domain.Interfaces.Providers;
using Financial.Domain.Interfaces.Repositories.Base;
using Financial.Domain.Models.Base;

namespace Financial.Domain.Interfaces.Services.Base
{
    public interface IDependencyAggregate<T> where T : BaseEntity
    {
        IBaseRepository<T> BaseRepository { get; }
        IUserProvider UserProvider { get; }
        FinancialDbContext DbContext { get; }
    }
}
