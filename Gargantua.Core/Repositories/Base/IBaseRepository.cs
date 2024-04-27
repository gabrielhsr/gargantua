using Microsoft.EntityFrameworkCore;

namespace Gargantua.Domain.Interfaces.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        DbContext Context { get; }
        Task<T> GetByIdAsync(Guid id);
        IQueryable<T> GetAll();
        Task<T> AddAsync(T entity);
        Task<T> DeleteAsync(Guid id);
        Task<T> UpdateAsync(T entity);
        Task<bool> Exists(Guid id);
    }
}
