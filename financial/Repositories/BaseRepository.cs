using Financial.Data;
using Financial.Data.Models;
using Financial.Helpers;
using Financial.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Financial.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        private readonly FinancialDbContext context;

        public BaseRepository(FinancialDbContext context)
        {
            this.context = context;
        }
        public async Task<T> AddAsync(T entity)
        {
            await context.AddAsync(entity);
            await context.SaveChangesAsync();

            return entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await GetAsync(id);

            if (entity is null)
            {
                throw new Exception("Id not found!");
            }

            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task<bool> Exists(Guid id)
        {
            var entity = await GetAsync(id);
            return entity != null;
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await context.Set<T>().AsNoTracking().ToListAsync();
        }

        public async Task<T?> GetAsync(Guid? id)
        {
            if (id is null)
            {
                return null;
            }

            return await context.Set<T>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<T> SaveAsync(Guid id, T entity)
        {
            if (IdHelper.IsNullOrDefault(id))
            {
                await AddAsync(entity);
            } else
            {
                if (await Exists(id))
                {
                    entity.Id= id;

                    await UpdateAsync(entity);
                } else
                {
                    throw new Exception("Id not found!");
                }
            }

            return entity;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            context.Update(entity);
            await context.SaveChangesAsync();

            return entity;
        }
    }
}
