using Financial.Domain.Data;
using Financial.Domain.Models;
using Financial.Domain.Interfaces.Repositories;

namespace Financial.Domain.Interfaces.Services.Base
{
    public interface IDependencyAggregate<T> where T : BaseEntity
    {
        IBaseRepository<T> BaseRepository { get; }
        IHttpContextAccessor HttpContextAccessor { get; }
        FinancialDbContext DbContext { get; }
    }
}
