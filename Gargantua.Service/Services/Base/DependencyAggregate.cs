using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Repositories;
using Gargantua.Domain.Interfaces.Services;
using Gargantua.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Gargantua.Service.Services
{
    public class DependencyAggregate<TEntity, TID> : IDependencyAggregate<TEntity, TID> where TEntity : BaseEntity<TID>
    {
        public DependencyAggregate(IBaseRepository<TEntity, TID> baseRepository, GargantuaDbContext dbContext)
        {
            BaseRepository = baseRepository;
            DbContext = dbContext;
        }

        public IBaseRepository<TEntity, TID> BaseRepository { get; }
        public DbContext DbContext { get; }
    }
}
