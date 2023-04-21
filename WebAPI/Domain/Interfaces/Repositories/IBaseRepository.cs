using Financial.Domain.Data;

namespace Financial.Domain.Interfaces.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        FinancialDbContext Context { get; }
        Task<T> GetAsync(Guid id);
        Task<List<T>> GetAllAsync();
        Task<T> AddAsync(T entity);
        Task DeleteAsync(Guid id);
        Task<T> UpdateAsync(T entity);
        Task<bool> Exists(Guid id);
    }
}
