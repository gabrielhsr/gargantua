namespace Financial.Interfaces.Services
{
    public interface IBaseService<T>
    {
        Task<T?> GetAsync(Guid id);
        Task<List<T>> GetAllAsync();
        Task RemoveAsync(Guid id);
        Task<T> SaveAsync(Guid id, T entity);
    }
}
