using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Repositories;
using Gargantua.Domain.Interfaces.Services;
using Gargantua.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Gargantua.Service.Services
{
    public class DependencyAggregate<T> : IDependencyAggregate<T> where T : BaseEntity
    {
        public DependencyAggregate(IBaseRepository<T> baseRepository, GargantuaDbContext dbContext)
        {
            BaseRepository = baseRepository;
            DbContext = dbContext;
        }

        public IBaseRepository<T> BaseRepository { get; }
        public DbContext DbContext { get; }
    }
}
