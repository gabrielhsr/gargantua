namespace Financial.Domain.Interfaces.Services.Base
{
    public interface IBaseService<T>
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IList<T>> GetAllAsync();
        Task RemoveAsync(Guid id);
        Task<T> SaveAsync(Guid id, T entity);
    }
}
