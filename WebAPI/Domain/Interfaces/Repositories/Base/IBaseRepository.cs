using Financial.Data;

namespace Financial.Domain.Interfaces.Repositories.Base
{
    public interface IBaseRepository<T> where T : class
    {
        FinancialDbContext Context { get; }
        Task<T> GetByIdAsync(Guid id);
        IQueryable<T> GetAll();
        Task<T> AddAsync(T entity);
        Task<T> DeleteAsync(Guid id);
        Task<T> UpdateAsync(T entity);
        Task<bool> Exists(Guid id);
    }
}
