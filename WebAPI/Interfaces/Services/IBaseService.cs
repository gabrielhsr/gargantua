namespace Financial.Interfaces.Services
{
    public interface IBaseService<T>
    {
        Task<T> GetAsync(Guid id);
        Task<IList<T>> GetAllAsync();
        Task RemoveAsync(Guid id);
        Task<T> SaveAsync(Guid id, T entity);
    }
}
