namespace Gargantua.Domain.Interfaces.Services.Base
{
    public interface IBaseService<TEntity, TID>
    {
        Task<TEntity> GetByIdAsync(TID id);
        IQueryable<TEntity> GetAll();
        Task<TEntity> RemoveAsync(TID id);
        Task<TEntity> SaveAsync(TID id, TEntity entity);
    }
}
