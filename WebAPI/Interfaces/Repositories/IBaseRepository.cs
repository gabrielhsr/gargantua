namespace Financial.Interfaces.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        Task<T> GetAsync(Guid id);
        Task<List<T>> GetAllAsync();
        Task<T> AddAsync(T entity);
        Task DeleteAsync(Guid id);
        Task<T> UpdateAsync(T entity);
        Task<bool> Exists(Guid id);
    }
}
