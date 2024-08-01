using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Gargantua.Domain.Interfaces.Services
{
    public interface IDependencyAggregate<T> where T : BaseEntity
    {
        IBaseRepository<T> BaseRepository { get; }
        DbContext DbContext { get; }
    }
}
