using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Gargantua.Domain.Interfaces.Services
{
    public interface IDependencyAggregate<TEntity, TID> where TEntity : BaseEntity<TID>
    {
        IBaseRepository<TEntity, TID> BaseRepository { get; }
        DbContext DbContext { get; }
    }
}
