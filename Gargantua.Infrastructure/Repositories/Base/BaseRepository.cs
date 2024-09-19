using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Repositories;
using Gargantua.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Gargantua.Core.Repositories
{
    public class BaseRepository<TEntity, TID> : IBaseRepository<TEntity, TID> where TEntity : BaseEntity<TID>
    {
        public DbContext Context { get; }

        public BaseRepository(GargantuaDbContext context)
        {
            Context = context;
        }

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            await Context.AddAsync(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task<TEntity> DeleteAsync(TID id)
        {
            var entity = await GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception("Id not found!");
            }

            Context.Set<TEntity>().Remove(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task<bool> Exists(TID id)
        {
            var entity = await Context
                .Set<TEntity>()
                .AsNoTracking()
                .FirstOrDefaultAsync(entity => entity.Id.Equals(id));

            return entity != null;
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return Context
                .Set<TEntity>()
                .AsQueryable();
        }

        public virtual async Task<TEntity> GetByIdAsync(TID id)
        {
            return await Context
                .Set<TEntity>()
                .FirstOrDefaultAsync(entity => entity.Id.Equals(id));
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            Context.Update(entity);
            await Context.SaveChangesAsync();

            return entity;
        }
    }
}
