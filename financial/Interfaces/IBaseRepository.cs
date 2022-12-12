namespace Financial.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task<T?> GetAsync(Guid? id);
        Task<List<T>> GetAllAsync();
        Task<T> AddAsync(T entity);
        Task DeleteAsync(Guid id);
        Task<T> UpdateAsync(T entity);
        Task<T> SaveAsync(Guid id, T entity);
        Task<bool> Exists(Guid id);
    }
}
