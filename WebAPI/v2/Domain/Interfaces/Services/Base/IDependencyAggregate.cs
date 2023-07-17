using Financial.v2.Data;
using Financial.v2.Domain.Interfaces.Repositories.Base;
using Financial.v2.Domain.Models.Base;

namespace Financial.v2.Domain.Interfaces.Services.Base
{
    public interface IDependencyAggregate<T> where T : BaseEntity
    {
        IBaseRepository<T> BaseRepository { get; }
        IHttpContextAccessor HttpContextAccessor { get; }
        FinancialDbContext DbContext { get; }
    }
}
