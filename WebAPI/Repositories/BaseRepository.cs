using Financial.Data;
using Financial.Data.Models;
using Financial.Helpers;
using Microsoft.EntityFrameworkCore;
using Financial.Interfaces.Repositories;

namespace Financial.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        private readonly FinancialDbContext context;

        public BaseRepository(FinancialDbContext context)
        {
            this.context = context;
        }
        public virtual async Task<T> AddAsync(T entity)
        {
            await context.AddAsync(entity);
            await context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task DeleteAsync(Guid id)
        {
            var entity = await GetAsync(id);

            if (entity is null)
            {
                throw new Exception("Id not found!");
            }

            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();
        }

        public virtual async Task<bool> Exists(Guid id)
        {
            var entity = await context.Set<T>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            return entity != null;
        }

        public virtual async Task<List<T>> GetAllAsync()
        {
            return await context.Set<T>().ToListAsync();
        }

        public virtual async Task<T> GetAsync(Guid id)
        {
            return await context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task<T> UpdateAsync(T entity)
        {
            context.Update(entity);
            await context.SaveChangesAsync();

            return entity;
        }
    }
}
