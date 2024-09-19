using Microsoft.EntityFrameworkCore;

namespace Gargantua.Domain.Interfaces.Repositories
{
    public interface IBaseRepository<TEntity, TID> where TEntity : class
    {
        DbContext Context { get; }
        Task<TEntity> GetByIdAsync(TID id);
        IQueryable<TEntity> GetAll();
        Task<TEntity> AddAsync(TEntity entity);
        Task<TEntity> DeleteAsync(TID id);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task<bool> Exists(TID id);
    }
}
