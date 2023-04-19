using Financial.Data;
using Financial.Data.Models;
using Financial.Interfaces.Repositories;

namespace Financial.Interfaces.Services.Base
{
    public interface IDependencyAggregate<T> where T : BaseEntity
    {
        IBaseRepository<T> BaseRepository { get; }
        IHttpContextAccessor HttpContextAccessor { get; }
        FinancialDbContext DbContext { get; }
    }
}
