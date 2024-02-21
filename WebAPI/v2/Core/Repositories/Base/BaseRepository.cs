using Microsoft.EntityFrameworkCore;
using Financial.v2.Data;
using Financial.v2.Domain.Models.Base;
using Financial.v2.Domain.Interfaces.Repositories.Base;

namespace Financial.v2.Core.Repositories.Base
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        public FinancialDbContext Context { get; }

        public BaseRepository(FinancialDbContext context)
        {
            Context = context;
        }

        public virtual async Task<T> AddAsync(T entity)
        {
            await Context.AddAsync(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task<T> DeleteAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);

            if (entity is null)
            {
                throw new Exception("Id not found!");
            }

            Context.Set<T>().Remove(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task<bool> Exists(Guid id)
        {
            var entity = await Context
                .Set<T>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            return entity != null;
        }

        public virtual IQueryable<T> GetAll()
        {
            return Context
                .Set<T>()
                .AsQueryable();
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            return await Context
                .Set<T>()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task<T> UpdateAsync(T entity)
        {
            Context.Update(entity);
            await Context.SaveChangesAsync();

            return entity;
        }
    }
}
