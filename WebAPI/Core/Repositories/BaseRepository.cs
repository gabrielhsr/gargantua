using Microsoft.EntityFrameworkCore;
using Financial.Domain.Models;
using Financial.Domain.Data;
using Financial.Domain.Interfaces.Repositories;

namespace Financial.Core.Repositories
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

        public virtual async Task DeleteAsync(Guid id)
        {
            var entity = await GetAsync(id);

            if (entity is null)
            {
                throw new Exception("Id not found!");
            }

            Context.Set<T>().Remove(entity);
            await Context.SaveChangesAsync();
        }

        public virtual async Task<bool> Exists(Guid id)
        {
            var entity = await Context.Set<T>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            return entity != null;
        }

        public virtual async Task<List<T>> GetAllAsync()
        {
            return await Context.Set<T>().ToListAsync();
        }

        public virtual async Task<T> GetAsync(Guid id)
        {
            return await Context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task<T> UpdateAsync(T entity)
        {
            Context.Update(entity);
            await Context.SaveChangesAsync();

            return entity;
        }
    }
}
