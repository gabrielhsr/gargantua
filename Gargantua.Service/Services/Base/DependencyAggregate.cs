using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Providers;
using Gargantua.Domain.Interfaces.Repositories;
using Gargantua.Domain.Interfaces.Services;
using Gargantua.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Gargantua.Service.Services
{
    public class DependencyAggregate<T> : IDependencyAggregate<T> where T : BaseEntity
    {
        public DependencyAggregate(IBaseRepository<T> baseRepository, IUserProvider userProvider, GargantuaDbContext dbContext)
        {
            BaseRepository = baseRepository;
            UserProvider = userProvider;
            DbContext = dbContext;
        }

        public IBaseRepository<T> BaseRepository { get; }
        public IUserProvider UserProvider { get; }
        public DbContext DbContext { get; }
    }
}
